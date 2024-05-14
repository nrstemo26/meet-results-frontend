// GoogleMapsLoader.jsx
import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { baseUrl, mapsKey } from '../../config';

const libraries = ['places', 'marker'];

const GoogleMapsLoader = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapsKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;
