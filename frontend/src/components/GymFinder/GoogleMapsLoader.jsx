// GoogleMapsLoader.jsx
import React, { useState, useEffect } from 'react';
import { baseUrl, mapsProxyUrl } from '../../config';
import { MbSpinnerGradient } from '../../pages/Spinners/MbSpinnerGradient';

// Define the libraries to load - include more necessary libraries
const libraries = ['places', 'geometry', 'drawing'];

const GoogleMapsLoader = ({ children }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Use a simpler approach: manually load the Google Maps script via our proxy
  useEffect(() => {
    // Only load if not already loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      // Include all necessary libraries in the URL
      script.src = `${mapsProxyUrl}?service=load&libraries=${libraries.join(',')}&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function that will be called when the script loads
      window.initGoogleMaps = () => {
        console.log('Google Maps API loaded successfully via proxy');
        setMapLoaded(true);
      };
      
      // Add error handling
      script.onerror = (error) => {
        console.error('Error loading Google Maps API:', error);
        setLoadError(error);
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup function to remove the script and global callback
        if (window.initGoogleMaps) {
          delete window.initGoogleMaps;
        }
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else {
      // If Google Maps is already loaded
      setMapLoaded(true);
    }
  }, []);

  if (loadError) {
    return <div className="text-red-500 p-4 border border-red-300 rounded m-4">
      Error loading Google Maps API. Please try refreshing the page.
    </div>;
  }

  if (!mapLoaded) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-xl font-bold mb-4 text-primary-950">Consulting the Oracle...</h1>
        <MbSpinnerGradient />
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;
