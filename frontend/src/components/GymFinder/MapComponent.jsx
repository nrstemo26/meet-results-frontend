// MapComponent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';
import MarkerCard from './MarkerCard';
import FilterForm from './FilterForm'; // Import the FilterForm component

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

const MapComponent = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [lastBounds, setLastBounds] = useState(null);
    const defaultCenter = { lat: 43.034538, lng: -87.9328348 };
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [filters, setFilters] = useState({
        gymType: '',
        maxMonthlyRate: '150', // Default value for slider
        maxDropInRate: '20',   // Default value for slider
        usawClub: true,        // Default value for USAW Club
        tags: []
    });
    const [ranges, setRanges] = useState({
        minMonthlyRate: 0,
        maxMonthlyRate: 250,
        minDropInRate: 0,
        maxDropInRate: 50
    });
    const mapRef = useRef(null);
    const markerRefs = useRef([]); // Reference to keep track of markers

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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    setMapCenter(defaultCenter);
                }
            );
        }
    }, []);

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

    const fetchPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(placeUrl, {
                params: {
                    place_id: placeId,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching place details:', error);
            return null;
        }
    };

    const mapStyles = {
        height: '100vh',
        width: '100%',
    };

    const handleBoundsChanged = () => {
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
                if (!lastBounds || hasBoundsChanged(lastBounds, currentBounds)) {
                    setLastBounds(currentBounds);
                    fetchMarkers(currentBounds);
                }
            }
        }
    };

    const hasBoundsChanged = (lastBounds, currentBounds) => {
        return (
            lastBounds.north !== currentBounds.north ||
            lastBounds.east !== currentBounds.east ||
            lastBounds.south !== currentBounds.south ||
            lastBounds.west !== currentBounds.west
        );
    };

    const handleMarkerClick = async (marker) => {
        const placeDetails = await fetchPlaceDetails(marker.placeId);
        setSelectedMarker({
            ...marker,
            rating: placeDetails ? placeDetails.rating : null,
        });
    };

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

    const handleCenterChanged = () => {
        const map = mapRef.current;
        if (map) {
            const center = map.getCenter();
            setMapCenter({ lat: center.lat(), lng: center.lng() });
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            handleBoundsChanged();
        }
    }, [mapCenter]);

    useEffect(() => {
        if (lastBounds) {
            fetchMarkers(lastBounds);
        }
    }, [filters]);

    useEffect(() => {
        if (mapRef.current) {
            renderMarkers(mapRef.current, markers);
        }
    }, [markers]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTagsChange = (selectedOptions) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            tags: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full">
            
            <div className="col-span-2">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={mapCenter}
                    options={{
                        tilt: 0,
                        heading: 0,
                        mapId,
                        draggable: true,
                        zoomControl: true,
                        scrollwheel: true,
                        disableDoubleClickZoom: false,
                        fullscreenControl: true,
                    }}
                    onLoad={(map) => {
                        mapRef.current = map;
                        handleBoundsChanged(); // Fetch markers after map load
                    }}
                    onDragEnd={handleCenterChanged}
                    onZoomChanged={handleBoundsChanged} // Fetch markers on zoom change
                >
                    {selectedMarker && (
                        <InfoWindow
                            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                            onCloseClick={() => setSelectedMarker(null)}
                        >
                            <MarkerCard marker={selectedMarker} />
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
            <FilterForm
                filters={filters}
                onFilterChange={handleFilterChange}
                onTagsChange={handleTagsChange}
                ranges={ranges}
            />
        </div>
    );
};

export default MapComponent;
