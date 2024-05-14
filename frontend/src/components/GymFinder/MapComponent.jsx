// MapComponent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl, mapsKey } from '../../config';

const libraries = ['places', 'marker'];
const mapId ='888af732c21aac3d'
const markerUrl = `${baseUrl}/v1/gymfinder/markers`


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
    const mapRef = useRef(null);
  
    // console.log('Map ID:', mapId);
    // console.log('Google Maps API Key:', mapsKey);
  
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: mapsKey,
      libraries,
      mapIds: [mapId],
    });
  
    // console.log('isLoaded:', isLoaded);
    // console.log('loadError:', loadError);
  
    const fetchMarkers = useCallback(debounce(async (bounds) => {
      const { north, east, south, west } = bounds;
      try {
        console.log('Fetching markers with bounds:', bounds);
        const response = await axios.get(markerUrl, {
          params: {
            sw_lat: south,
            sw_lng: west,
            ne_lat: north,
            ne_lng: east,
          },
        });
        console.log('Markers fetched:', response.data);
        setMarkers(response.data);
        renderMarkers(mapRef.current, response.data); // Call renderMarkers after fetching markers
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    }, 500), []);
  
    const mapStyles = {
      height: '100vh',
      width: '100%',
    };
  
    const defaultCenter = {
      lat: 37.7749,
      lng: -122.4194,
    };
  
    const handleBoundsChanged = () => {
      const map = mapRef.current;
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
          console.log('Bounds changed:', currentBounds);
          setLastBounds(currentBounds);
          fetchMarkers(currentBounds);
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
  
    const handleMarkerClick = (marker) => {
      console.log('Marker clicked:', marker);
      setSelectedMarker(marker);
    };
  
    const renderMarkers = (map, markersData) => {
      console.log('Rendering markers:', markersData);
      markersData.forEach((marker, index) => {
        const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: marker.lat, lng: marker.lng },
          title: marker.name,
        });
  
        advancedMarker.addListener('click', () => handleMarkerClick(marker));
      });
    };
  
    if (loadError) {
    //   console.error('Google Maps API load error: ', loadError);
      return <div>Error loading map</div>;
    }
  
    return (
      isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          options={{
            tilt: 0,
            heading: 0,
            mapId, // Ensure mapId is correctly included in options
          }}
          onLoad={(map) => {
            mapRef.current = map;
            // console.log('Map loaded:', map);
            handleBoundsChanged();
          }}
          onBoundsChanged={handleBoundsChanged}
        >
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
                <h2 className="text-lg font-semibold mb-2">{selectedMarker.name}</h2>
                <div className="mb-2">
                  {selectedMarker.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-1">Drop-in Fee: {selectedMarker.dropInFee}</p>
                <p className="text-sm text-gray-600">Monthly Fee: {selectedMarker.monthlyFee}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : <div>Loading map...</div>
    );
  };
  
  export default MapComponent;