// MapComponent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';
import MarkerCard from './MarkerCard';

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
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Initial center
    const mapRef = useRef(null);
  
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
            },
          });
          setMarkers(response.data);
          renderMarkers(mapRef.current, response.data);
        } catch (error) {
          console.error('Error fetching markers:', error);
        }
      }, 500),
      []
    );
  
    const mapStyles = {
      height: '100vh',
      width: '100%',
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
  
    return (
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
          handleBoundsChanged();
        }}
        onDragEnd={handleCenterChanged}
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
    );
  };
  
  export default MapComponent;