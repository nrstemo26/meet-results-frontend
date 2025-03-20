import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';
import MarkerCard from './MarkerCard';
import FilterForm from './FilterForm';

const mapId = '888af732c21aac3d';
const markerUrl = `${baseUrl}/v1/gymfinder/markers`;
const placeUrl = `${baseUrl}/v1/gymfinder/place-details`;
const rangeUrl = `${baseUrl}/v1/gymfinder/markers/range`;

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
        maxMonthlyRate: '150',
        maxDropInRate: '20',
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
    
    const mapRef = useRef(null);
    const markerRefs = useRef([]);

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
                setRanges(response.data);
            } catch (error) {
                console.error('Error fetching ranges:', error);
            }
        };

        fetchRanges();
    }, []);

    const fetchInitialMarkers = useCallback(() => {
        if (mapRef.current && !loading) {
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
    }, [mapCenter, loading, fetchMarkers]);

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

    const mapStyles = { height: '100%', width: '100%' };

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

    const clearMarkers = () => {
        markerRefs.current.forEach(marker => marker.setMap(null));
        markerRefs.current = [];
    };

    const renderMarkers = (map, markersData) => {
        clearMarkers();
        markersData.forEach((marker, index) => {
            const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
                map,
                position: { lat: marker.lat, lng: marker.lng },
                title: marker.name,
            });

            advancedMarker.addListener('click', () => handleMarkerClick(marker));
            markerRefs.current.push(advancedMarker);
        });
    };

    useEffect(() => {
        if (lastBounds) {
            fetchMarkers(lastBounds);
        }
    }, [filters, fetchMarkers]);

    useEffect(() => {
        if (mapRef.current) {
            renderMarkers(mapRef.current, markers);
        }
    }, [markers]);
    
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

    // Replace the handleDragEnd function with a more comprehensive handleIdle function
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
            
            // Only update if center has actually changed
            if (newCenter.latitude !== mapCenter.latitude || 
                newCenter.longitude !== mapCenter.longitude) {
                setMapCenter(newCenter);
            }
        }
        
        // Also handle bounds update here instead of in a separate handler
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

    // Add a mobile-friendly back button function
    const handleBackToList = () => {
        setViewMode('list');
        setSelectedMarker(null);
    };

    return (
        <div className="flex flex-col md:flex-row h-[80vh] w-full rounded-lg overflow-hidden shadow-md">
            {/* Filters Panel - Desktop */}
            <div className="hidden md:block w-80 bg-white overflow-y-auto border-r border-gray-200">
                <FilterForm 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onTagsChange={handleTagsChange} 
                    ranges={ranges} 
                />
            </div>
            
            {/* Map and List View Container */}
            <div className="flex-grow relative">
                {/* Mobile Controls */}
                <div className="md:hidden flex justify-between items-center p-2 bg-white border-b border-gray-200">
                    {/* Add a back button when a marker is selected in map view on mobile */}
                    {viewMode === 'map' && selectedMarker && isMobile ? (
                        <button 
                            onClick={() => setSelectedMarker(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                    ) : (
                        <button 
                            onClick={toggleMobileFilter} 
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            {isMobileFilterVisible ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    )}
                    
                    {/* Show list/map toggle except when marker is selected in map view */}
                    {!(viewMode === 'map' && selectedMarker && isMobile) && (
                        <button 
                            onClick={toggleViewMode} 
                            className="px-4 py-2 bg-primary-950 text-white rounded-md text-sm font-medium shadow-sm hover:bg-primary-700"
                        >
                            {viewMode === 'map' ? 'Show List' : 'Show Map'}
                        </button>
                    )}
                </div>
                
                {/* Mobile Filters (Conditionally shown) */}
                {isMobileFilterVisible && (
                    <div className="md:hidden bg-white p-2 border-b border-gray-200">
                        <FilterForm 
                            filters={filters} 
                            onFilterChange={handleFilterChange} 
                            onTagsChange={handleTagsChange} 
                            ranges={ranges} 
                        />
                    </div>
                )}
                
                {/* Desktop View Controls */}
                <div className="hidden md:flex absolute top-4 right-4 z-10 bg-white rounded-md shadow-md">
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-4 py-2 text-sm font-medium ${
                            viewMode === 'map' 
                                ? 'bg-primary-950 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${viewMode === 'map' ? 'rounded-md' : 'rounded-l-md'}`}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-sm font-medium ${
                            viewMode === 'list' 
                                ? 'bg-primary-950 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${viewMode === 'list' ? 'rounded-md' : 'rounded-r-md'}`}
                    >
                        List
                    </button>
                </div>
                
                {/* Map View */}
                {viewMode === 'map' && (
                    <div className="h-full">
                        {loading ? (
                            <div className="h-full flex items-center justify-center bg-gray-100">
                                <div className="text-center">
                                    <svg className="animate-spin h-8 w-8 text-primary-950 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-gray-600">Loading map...</p>
                                </div>
                            </div>
                        ) : (
                            <GoogleMap
                                onLoad={(map) => {
                                    mapRef.current = map;
                                }}
                                mapContainerStyle={mapStyles}
                                center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
                                zoom={12}
                                options={{
                                    mapId: mapId,
                                    fullscreenControl: false,
                                    mapTypeControl: false,
                                    streetViewControl: false,
                                }}
                                onIdle={handleIdle}
                            >
                                {/* Only show the InfoWindow on mobile or when the side panel is not visible */}
                                {selectedMarker && windowWidth < 1024 && (
                                    <InfoWindow
                                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                                        onCloseClick={() => setSelectedMarker(null)}
                                        options={{
                                            maxWidth: isMobile ? windowWidth - 40 : 300,
                                            pixelOffset: isMobile ? new window.google.maps.Size(0, -30) : undefined
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
                    <div className="h-full overflow-y-auto bg-gray-100 p-4">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="animate-spin h-8 w-8 text-primary-950 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-gray-600">Loading gyms...</p>
                                </div>
                            </div>
                        ) : markers.length === 0 ? (
                            <div className="text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900">No gyms found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or zooming out on the map.</p>
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
                <div className="hidden lg:block w-96 bg-white overflow-y-auto border-l border-gray-200">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-primary-950">Gym Details</h3>
                            <button 
                                onClick={() => setSelectedMarker(null)}
                                className="text-gray-500 hover:text-gray-700"
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
