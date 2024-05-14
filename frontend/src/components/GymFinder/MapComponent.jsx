// MapComponent.jsx
import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';

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
  
    const fetchMarkers = useCallback(debounce(async (bounds) => {
      const { north, east, south, west } = bounds;
      try {
        const response = await axios.get(markerUrl, {
          params: {
            sw_lat: south,
            sw_lng: west,
            ne_lat: north,
            ne_lng: east,
          },
        });
        setMarkers(response.data);
        renderMarkers(mapRef.current, response.data);
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
      setSelectedMarker(marker);
    };
  
    const renderMarkers = (map, markersData) => {
      markersData.forEach((marker, index) => {
        const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: marker.lat, lng: marker.lng },
          title: marker.name,
        });
  
        advancedMarker.addListener('click', () => handleMarkerClick(marker));
      });
    };
  
    return (
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        options={{
          tilt: 0,
          heading: 0,
          mapId,
        }}
        onLoad={(map) => {
          mapRef.current = map;
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
                {selectedMarker.categories && selectedMarker.categories.map((category, index) => (
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
              {selectedMarker.placeDetails && (
                <>
                  <p className="text-sm text-gray-600 mb-1">Address: {selectedMarker.placeDetails.formatted_address}</p>
                  <p className="text-sm text-gray-600 mb-1">Rating: {selectedMarker.placeDetails.rating}</p>
                  {selectedMarker.placeDetails.reviews && selectedMarker.placeDetails.reviews.map((review, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-sm text-gray-600"><strong>Review:</strong> {review.text}</p>
                      <p className="text-sm text-gray-600"><strong>Rating:</strong> {review.rating}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };
  
  export default MapComponent;