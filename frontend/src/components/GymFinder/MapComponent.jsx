import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl, mapsProxyUrl } from '../../config';
import MarkerCard from './MarkerCard';
import FilterForm from './FilterForm';
import { mapStyles, nightModeStyles, customMarkerIcon } from './mapStyles';
import { MbSpinnerGradient } from '../../pages/Spinners/MbSpinnerGradient';

const mapId = '888af732c21aac3d';
const markerUrl = `${baseUrl}/v1/gymfinder/markers`;
const placeUrl = `${baseUrl}/v1/gymfinder/place-details`;
const rangeUrl = `${baseUrl}/v1/gymfinder/markers/range`;

// Define map container style
const mapContainerStyle = { height: '100%', width: '100%' };

const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

const defaultCenter = { latitude: 43.034538, longitude: -87.9328348 };

const MapComponent = ({ cityName }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [lastBounds, setLastBounds] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [filters, setFilters] = useState({
        gymType: '',
        maxMonthlyRate: '',
        maxDropInRate: '',
        usawClub: true,
        tags: []
    });
    const [ranges, setRanges] = useState({
        minMonthlyRate: 0,
        maxMonthlyRate: 250,
        minDropInRate: 0,
        maxDropInRate: 50
    });
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('mapThemePreference');
        return savedTheme === 'dark';
    });
    const [useMapId, setUseMapId] = useState(true);
    
    const mapRef = useRef(null);
    const advancedMarkersRef = useRef([]);

    // Add a state to track if the user has manually interacted with the map
    const [userHasInteracted, setUserHasInteracted] = useState(false);

    // Close the selected marker when cityName changes
    useEffect(() => {
        if (selectedMarker) {
            setSelectedMarker(null);
        }
    }, [cityName]);

    useEffect(() => {
        const fetchCityInfo = async () => {
            setLoading(true);
            if (cityName) {
                try {
                    const response = await axios.get(`${baseUrl}/v1/gymfinder/cities/${cityName}`);
                    const cityData = response.data.city_metadata;
                    setMapCenter({ latitude: cityData.latitude, longitude: cityData.longitude });
                } catch (error) {
                    console.error('Error fetching city info:', error);
                    setMapCenter(defaultCenter);
                } finally {
                    setLoading(false);
                }
            } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setMapCenter({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        setLoading(false);
                    },
                    () => {
                        setMapCenter(defaultCenter);
                        setLoading(false);
                    }
                );
            } else {
                setMapCenter(defaultCenter);
                setLoading(false);
            }
        };

        fetchCityInfo();
    }, [cityName]);

    const fetchMarkers = useCallback(
        debounce(async (bounds) => {
            const { north, east, south, west } = bounds;
            try {
                const response = await axios.get(markerUrl, {
                    params: {
                        sw_lat: south,
                        sw_lng: west,
                        ne_lat: north,
                        ne_lng: east,
                        gymType: filters.gymType,
                        maxMonthlyRate: filters.maxMonthlyRate,
                        maxDropInRate: filters.maxDropInRate,
                        usawClub: filters.usawClub,
                        tags: filters.tags
                    },
                    paramsSerializer: params => {
                        return Object.keys(params)
                            .map(key => {
                                if (Array.isArray(params[key])) {
                                    return params[key].map(val => `${key}[]=${val}`).join('&');
                                }
                                return `${key}=${params[key]}`;
                            })
                            .join('&');
                    }
                });
                setMarkers(response.data);
            } catch (error) {
                console.error('Error fetching markers:', error);
            }
        }, 500),
        [filters]
    );

    useEffect(() => {
        // Fetch range values on page load
        const fetchRanges = async () => {
            try {
                const response = await axios.get(rangeUrl);
                // Update the ranges state
                setRanges(response.data);
                
                // Set the filter values based on the fetched ranges
                setFilters(prev => ({
                    ...prev,
                    maxMonthlyRate: response.data.maxMonthlyRate.toString(),
                    maxDropInRate: response.data.maxDropInRate.toString()
                }));
                
                console.log("Ranges updated:", response.data);
                console.log("Filters updated with max values:", {
                    monthlyRate: response.data.maxMonthlyRate.toString(),
                    dropInRate: response.data.maxDropInRate.toString()
                });
            } catch (error) {
                console.error('Error fetching ranges:', error);
            }
        };

        fetchRanges();
    }, []);

    const fetchInitialMarkers = useCallback(() => {
        if (mapRef.current && !loading && !userHasInteracted) {
            const map = mapRef.current;
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(mapCenter.latitude + 0.05, mapCenter.longitude + 0.05));
            bounds.extend(new window.google.maps.LatLng(mapCenter.latitude - 0.05, mapCenter.longitude - 0.05));
            
            // Just fit the bounds without any flags
            map.fitBounds(bounds);
            
            // Get the new bounds and fetch markers
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const currentBounds = {
                north: ne.lat(),
                east: ne.lng(),
                south: sw.lat(),
                west: sw.lng(),
            };
            setLastBounds(currentBounds);
            fetchMarkers(currentBounds);
        }
    }, [mapCenter, loading, fetchMarkers, userHasInteracted]);

    useEffect(() => {
        fetchInitialMarkers();
    }, [fetchInitialMarkers]);

    const fetchPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(placeUrl, {
                params: { place_id: placeId },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching place details:', error);
            return null;
        }
    };

    const handleBoundsChanged = useCallback(() => {
        const map = mapRef.current;
        if (map) {
            const bounds = map.getBounds();
            if (bounds) {
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                const currentBounds = {
                    north: ne.lat(),
                    east: ne.lng(),
                    south: sw.lat(),
                    west: sw.lng(),
                };
                
                // Only update if bounds actually changed
                if (!lastBounds || hasBoundsChanged(lastBounds, currentBounds)) {
                    setLastBounds(currentBounds);
                    fetchMarkers(currentBounds);
                }
            }
        }
    }, [lastBounds, fetchMarkers]);

    const hasBoundsChanged = (lastBounds, currentBounds) => (
        lastBounds.north !== currentBounds.north ||
        lastBounds.east !== currentBounds.east ||
        lastBounds.south !== currentBounds.south ||
        lastBounds.west !== currentBounds.west
    );

    const handleMarkerClick = useCallback(async (marker) => {
        const placeDetails = await fetchPlaceDetails(marker.placeId);
        
        // On mobile, when a marker is selected in list view, switch to map view 
        // to make it easy to see the location
        if (isMobile && viewMode === 'list') {
            setViewMode('map');
        }
        
        setSelectedMarker({
            ...marker,
            rating: placeDetails ? placeDetails.rating : null,
        });
    }, [isMobile, viewMode, fetchPlaceDetails]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleTagsChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setFilters((prevFilters) => ({ ...prevFilters, tags: selectedValues }));
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'map' ? 'list' : 'map');
    };

    const toggleMobileFilter = () => {
        setIsMobileFilterVisible(!isMobileFilterVisible);
    };

    // Update the handleIdle function to respect user interaction
    const handleIdle = useCallback(() => {
        const map = mapRef.current;
        if (!map) return;

        // Get current center from the map
        const center = map.getCenter();
        if (center) {
            const newCenter = {
                latitude: center.lat(),
                longitude: center.lng()
            };
            
            // Check if the center has changed significantly
            const significant = Math.abs(newCenter.latitude - mapCenter.latitude) > 0.001 || 
                               Math.abs(newCenter.longitude - mapCenter.longitude) > 0.001;
                               
            if (significant) {
                setMapCenter(newCenter);
                setUserHasInteracted(true); // Mark that the user has interacted
            }
        }
        
        // Handle bounds update here instead of in a separate handler
        const bounds = map.getBounds();
        if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const currentBounds = {
                north: ne.lat(),
                east: ne.lng(),
                south: sw.lat(),
                west: sw.lng(),
            };
            
            // Only update if bounds changed significantly
            if (!lastBounds || hasBoundsChanged(lastBounds, currentBounds)) {
                setLastBounds(currentBounds);
                fetchMarkers(currentBounds);
            }
        }
    }, [mapCenter, lastBounds, fetchMarkers]);

    // Add a useEffect to handle window resizing
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setIsMobile(width < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add back the useEffect for fetching markers when filters change
    useEffect(() => {
        if (lastBounds) {
            fetchMarkers(lastBounds);
        }
    }, [filters, fetchMarkers]);

    // Add a mobile-friendly back button function
    const handleBackToList = () => {
        setViewMode('list');
        setSelectedMarker(null);
    };

    // Toggle map theme and save preference
    const toggleMapTheme = () => {
        const newDarkModeValue = !isDarkMode;
        setIsDarkMode(newDarkModeValue);
        localStorage.setItem('mapThemePreference', newDarkModeValue ? 'dark' : 'light');
        // Note: Currently, dark mode only affects marker colors and some UI elements
        // The map styling doesn't change significantly, which is why the toggle button is hidden
    };

    // Define map container style at render time to match theme
    const currentMapContainerStyle = { 
        height: '100%', 
        width: '100%', 
        backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6' 
    };

    // Add a useEffect to handle AdvancedMarkerElement rendering
    useEffect(() => {
        // Only run if map is loaded and markers exist
        if (mapRef.current && markers.length > 0 && window.google?.maps?.marker?.AdvancedMarkerElement) {
            // Clear any previous advanced markers
            if (advancedMarkersRef.current.length > 0) {
                advancedMarkersRef.current.forEach(marker => marker.map = null);
                advancedMarkersRef.current = [];
            }
            
            // Create new advanced markers
            markers.forEach(markerData => {
                try {
                    // Create a marker element
                    const markerElement = document.createElement('div');
                    markerElement.innerHTML = `
                        <div style="
                            background-color: ${isDarkMode ? '#ffffff' : '#1c1e37'};
                            color: ${isDarkMode ? '#1c1e37' : '#ffffff'};
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 2px solid ${isDarkMode ? '#1c1e37' : '#ffffff'};
                            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                <path d="M12 2L7 6v14h10V6l-5-4z"/>
                            </svg>
                        </div>
                    `;
                    
                    // Create the advanced marker
                    const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
                        map: mapRef.current,
                        position: { lat: markerData.lat, lng: markerData.lng },
                        title: markerData.name,
                        content: markerElement
                    });
                    
                    // Add click handler
                    advancedMarker.addListener('click', () => {
                        handleMarkerClick(markerData);
                    });
                    
                    // Store reference
                    advancedMarkersRef.current.push(advancedMarker);
                } catch (error) {
                    console.error('Error creating advanced marker:', error);
                }
            });
        }
    }, [markers, isDarkMode, handleMarkerClick]);

    // Add handlers for user interaction with the map
    const handleMapDragStart = useCallback(() => {
        setUserHasInteracted(true);
    }, []);

    const handleZoomChanged = useCallback(() => {
        setUserHasInteracted(true);
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-[80vh] w-full rounded-lg overflow-hidden shadow-md">
            {/* Filters Panel - Desktop */}
            <div className={`hidden md:block w-80 overflow-y-auto border-r ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
                <FilterForm 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onTagsChange={handleTagsChange} 
                    ranges={ranges}
                    isDarkMode={isDarkMode}
                />
            </div>
            
            {/* Map and List View Container */}
            <div className="flex-grow relative">
                {/* Mobile Controls */}
                <div className={`md:hidden flex justify-between items-center p-2 border-b z-20 relative ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    {/* Add a back button when a marker is selected in map view on mobile */}
                    {viewMode === 'map' && selectedMarker && isMobile ? (
                        <button 
                            onClick={() => setSelectedMarker(null)}
                            className={`px-4 py-2 border rounded-md text-sm font-medium shadow-sm flex items-center ${
                                isDarkMode 
                                    ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                    ) : (
                        <button 
                            onClick={toggleMobileFilter} 
                            className={`px-4 py-2 border rounded-md text-sm font-medium shadow-sm ${
                                isDarkMode 
                                    ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {isMobileFilterVisible ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    )}
                    
                    {/* Show list/map toggle except when marker is selected in map view */}
                    {!(viewMode === 'map' && selectedMarker && isMobile) && (
                        <button 
                            onClick={toggleViewMode} 
                            className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                                isDarkMode 
                                    ? 'bg-primary-800 text-white hover:bg-primary-700' 
                                    : 'bg-primary-950 text-white hover:bg-primary-700'
                            }`}
                        >
                            {viewMode === 'map' ? 'Show List' : 'Show Map'}
                        </button>
                    )}
                </div>
                
                {/* Mobile Filters (Conditionally shown) */}
                {isMobileFilterVisible && (
                    <div className={`md:hidden p-2 border-b ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <FilterForm 
                            filters={filters} 
                            onFilterChange={handleFilterChange} 
                            onTagsChange={handleTagsChange} 
                            ranges={ranges}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                )}
                
                {/* Desktop View Controls */}
                <div className={`hidden md:flex absolute top-4 right-4 z-20 rounded-md shadow-md ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-4 py-2 text-sm font-medium ${
                            viewMode === 'map' 
                                ? isDarkMode ? 'bg-primary-800 text-white' : 'bg-primary-950 text-white'
                                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${viewMode === 'map' ? 'rounded-md' : 'rounded-l-md'}`}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-sm font-medium ${
                            viewMode === 'list' 
                                ? isDarkMode ? 'bg-primary-800 text-white' : 'bg-primary-950 text-white'
                                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${viewMode === 'list' ? 'rounded-md' : 'rounded-r-md'}`}
                    >
                        List
                    </button>
                </div>
                
                {/* Map View */}
                {viewMode === 'map' && (
                    <div className="h-full relative">
                        {/* Map ID toggle button - Dark mode toggle is hidden for now */}
                        <div className="absolute top-4 left-4 z-10 flex space-x-2">
                            {/* Dark mode toggle hidden for now since it only has minor visual impact
                               If you implement more distinctive map styling for dark mode in the future,
                               you can uncomment this button */}
                            {/* 
                            <button 
                                onClick={toggleMapTheme} 
                                className={`p-2 rounded-full shadow-md ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
                                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                            */}
                            {/* Toggle for mapId (for development testing only) - commented out for production */}
                            {/* 
                            <button 
                                onClick={() => setUseMapId(!useMapId)} 
                                className={`px-3 py-2 rounded-md shadow-md text-sm font-medium ${
                                    useMapId 
                                        ? isDarkMode ? 'bg-green-900 hover:bg-green-800 text-white' : 'bg-green-500 hover:bg-green-600 text-white' 
                                        : isDarkMode ? 'bg-red-900 hover:bg-red-800 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                                title="Toggle between Cloud Console styling (Map ID) and custom styling for testing"
                            >
                                {useMapId ? 'Using Google Cloud Styling' : 'Using Custom Map Styling'}
                            </button>
                            */}
                        </div>
                        
                        {loading ? (
                            <div className={`h-full flex items-center justify-center flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <h1 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-950'}`}>Consulting the Oracle...</h1>
                                <MbSpinnerGradient />
                            </div>
                        ) : (
                            <GoogleMap
                                onLoad={(map) => {
                                    mapRef.current = map;
                                }}
                                mapContainerStyle={currentMapContainerStyle}
                                center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
                                zoom={12}
                                options={{
                                    // Only use mapId when it's both enabled and we're not in dark mode
                                    ...(useMapId && !isDarkMode ? { mapId: mapId } : {}),
                                    fullscreenControl: false,
                                    mapTypeControl: false,
                                    streetViewControl: false,
                                    // Apply styles when not using mapId or in dark mode
                                    ...(!useMapId || isDarkMode ? { styles: isDarkMode ? nightModeStyles : mapStyles } : {}),
                                    zoomControlOptions: {
                                        position: window.google?.maps?.ControlPosition?.RIGHT_TOP
                                    },
                                    // Add gesture handling options to prevent auto-zooming behavior
                                    gestureHandling: "greedy", // Changed from "cooperative" to "greedy" for better control
                                    minZoom: 3,
                                    maxZoom: 18,
                                    scrollwheel: true
                                }}
                                onIdle={handleIdle}
                                onDragStart={handleMapDragStart}
                                onZoomChanged={handleZoomChanged}
                            >
                                {/* Render markers - only if not using AdvancedMarkerElement */}
                                {!window.google?.maps?.marker?.AdvancedMarkerElement && markers.map((marker) => (
                                    <Marker
                                        key={marker.placeId}
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        title={marker.name}
                                        onClick={() => handleMarkerClick(marker)}
                                        icon={isDarkMode ? {
                                            ...customMarkerIcon,
                                            fillColor: "#ffffff",
                                            strokeColor: "#1c1e37" 
                                        } : customMarkerIcon}
                                        animation={window.google?.maps?.Animation?.DROP}
                                    />
                                ))}
                                
                                {/* Only show the InfoWindow on mobile or when the side panel is not visible */}
                                {selectedMarker && windowWidth < 1024 && (
                                    <InfoWindow
                                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                                        onCloseClick={() => setSelectedMarker(null)}
                                        options={{
                                            maxWidth: isMobile ? windowWidth - 40 : 300,
                                            pixelOffset: isMobile ? new window.google.maps.Size(0, -30) : undefined,
                                            // Info window styling needs to be compatible with Google Maps
                                            // These style options are more limited than what we tried before
                                            disableAutoPan: false
                                        }}
                                    >
                                        <div className="info-window" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
                                            <MarkerCard marker={selectedMarker} isMobile={isMobile} />
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        )}
                    </div>
                )}
                
                {/* List View */}
                {viewMode === 'list' && (
                    <div className={`h-full overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        {loading ? (
                            <div className={`h-full flex items-center justify-center flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <h1 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-950'}`}>Consulting the Oracle...</h1>
                                <MbSpinnerGradient />
                            </div>
                        ) : markers.length === 0 ? (
                            <div className="text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>No gyms found</h3>
                                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your filters or zooming out on the map.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                {markers.map((marker) => (
                                    <div 
                                        key={marker.placeId} 
                                        className="cursor-pointer transition-transform hover:scale-[1.02]"
                                        onClick={() => handleMarkerClick(marker)}
                                    >
                                        <MarkerCard marker={marker} isMobile={isMobile} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Selected Marker Panel - Only visible when marker is selected on larger screens AND in map view */}
            {selectedMarker && viewMode === 'map' && (
                <div className={`hidden lg:block w-96 overflow-y-auto border-l ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-primary-950'}`}>Gym Details</h3>
                            <button 
                                onClick={() => setSelectedMarker(null)}
                                className={isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <MarkerCard marker={selectedMarker} isMobile={false} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
