// Custom Google Maps styling to match Lift Oracle brand
export const mapStyles = [
  {
    // Overall map style - subtle and professional
    featureType: "all",
    elementType: "all",
    stylers: [
      { saturation: -20 }
    ]
  },
  {
    // Water features in a light blue
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#e9e9e9" },
      { lightness: 17 }
    ]
  },
  {
    // Land areas with a subtle warm tone
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      { color: "#f5f5f5" },
      { lightness: 20 }
    ]
  },
  {
    // Roads in primary brand color (subdued)
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      { color: "#1c1e37" }, // primary-950 equivalent
      { lightness: 75 }     // Increased from 70 to 75 for better visibility
    ]
  },
  {
    // Road strokes slightly darker
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#1c1e37" }, // primary-950 equivalent
      { lightness: 45 },    // Increased from 40 to 45
      { weight: 0.1 }       // Reduced from 0.2 to 0.1
    ]
  },
  {
    // Road labels
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#333333" },
      { lightness: 5 }
    ]
  },
  {
    // Road labels outline
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#ffffff" },
      { lightness: 0 },
      { weight: 3 }  // Increased from 2 to 3
    ]
  },
  {
    // Arterial roads
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 18 }
    ]
  },
  {
    // Local roads
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 16 }
    ]
  },
  {
    // Points of interest in secondary color
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      { color: "#f0f0f0" },
      { lightness: 21 }
    ]
  },
  {
    // Transit stations with accent color
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      { color: "#f2f2f2" },
      { lightness: 19 }
    ]
  },
  {
    // Administrative areas
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      { color: "#fefefe" },
      { lightness: 20 }
    ]
  },
  {
    // Administrative borders
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#fefefe" },
      { lightness: 17 },
      { weight: 1.2 }
    ]
  },
  {
    // All text labels - improve contrast
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#333333" }
    ]
  },
  {
    // All text strokes - ensure readability
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#ffffff" },
      { lightness: 0 },
      { weight: 3 }  // Increased from 2 to 3
    ]
  },
  {
    // Points of interest labels - ensure visibility
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "simplified" }
    ]
  },
  {
    // Road signs and other icons
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      { visibility: "on" },
      { saturation: -80 },  // Changed from -100 to -80
      { lightness: 5 }      // Changed from 10 to 5 for better contrast
    ]
  }
];

// Night mode style for a more dramatic look
export const nightModeStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      { color: "#0f172a" } // Dark background
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { color: "#1c1e37" }, // primary-950
      { lightness: 15 }     // Increased from 10 to 15
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#0c4a6e" }, // Dark blue for water
      { lightness: 10 }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      { color: "#171e2e" }, 
      { lightness: 5 }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#f9fafb" } // Lighter text for better contrast in dark mode
    ]
  },
  {
    // Text outline for better readability in dark mode
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#000000" },
      { lightness: 0 },
      { weight: 3 }  // Increased from 2 to 3
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      { color: "#2d3748" }
    ]
  },
  {
    // Road signs and icons in dark mode
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      { visibility: "on" },
      { lightness: 60 } // Increased from 50 to 60 for better visibility
    ]
  },
  {
    // Road labels in dark mode
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#f9fafb" },
      { lightness: 0 }
    ]
  },
  {
    // Road labels outline in dark mode
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#000000" },
      { lightness: 0 },
      { weight: 3 }
    ]
  }
];

// Custom marker icon in brand colors
export const customMarkerIcon = {
  path: "M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z",
  fillColor: "#1c1e37", // primary-950
  fillOpacity: 0.9,
  strokeWeight: 1,
  strokeColor: "#ffffff",
  scale: 1.5,
  anchor: { x: 12, y: 24 }
}; 