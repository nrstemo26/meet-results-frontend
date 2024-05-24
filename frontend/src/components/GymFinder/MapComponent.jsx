// MapComponent.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';
import MarkerCard from './MarkerCard';

const mapId ='888af732c21aac3d'
const markerUrl = `${baseUrl}/v1/gymfinder/markers`
const placeUrl = `${baseUrl}/v1/gymfinder/place-details`


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
    );
  };
  
  export default MapComponent;