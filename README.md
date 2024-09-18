# React Leaflet Map Project

This project is a React application that integrates Leaflet for interactive map functionality. It allows users to view maps, search locations, and add custom markers.

# Features 

- Display interactive maps using Leaflet and React.
- Add markers for locations on the map.
- Search for locations and dynamically add markers.
- Custom zoom controls and layer toggle feature.
- Reset map view based on selected location.

# Technologies Used
- React – A JavaScript library for building fast and interactive user interfaces.
- Leaflet – A lightweight, open-source library for rendering mobile-friendly interactive maps.
- Vite – A next-generation frontend build tool for fast development and optimized builds.
- TypeScript – A statically-typed superset of JavaScript that adds type safety to your code.

# Getting Started
Follow these instructions to set up the project locally.

# Prerequisites
Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn for dependency management

# Installation

1. Clone the repository:
```git clone https://github.com/your-username/leafy-map.git```

2. Open project in IDE or you can also run it via terminal.

3. Install dependencies:
```npm install```

4. Run the development server:
```npm run dev```

The app should now be running on http://localhost:5173 (or as configured by Vite).

# Leaflet Setup
To create a leaflet map in your own project:

- Install leaflet and react-leaflet with ```npm install react-leaflet leaflet```
- Import core components with ```import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'```
- Add leaflet stylesheet to the component with ```import 'leaflet/dist/leaflet.css'```

# Usage
Once the project is running, you can:

- Interact with the map.
- Search for locations using the search box.
- Add custom markers to the map.

You can also customize the initial map view and markers by modifying the initialLocations array in the App.tsx file.
```
const initialLocations = [
  { display_name: 'London', lat: 51.5074, lon: -0.1278 },
  { display_name: 'New York', lat: 40.7128, lon: -74.006 },
  // Add more locations here
];
```

# Available Scripts
In the project directory, you can run:

- ```npm run dev``` – Runs the app in the development mode.

# Customization
Changing the Default Map View

You can customize the default map view in the Map.tsx file by updating the defaultPosition variable.

```const defaultPosition: LatLngExpression = [51.505, -0.09]; // Default: London```

# Adding New Map Layers

In the Map.tsx file, you can switch or add new tile layers by changing the URL in the TileLayer component.

```tsx
<TileLayer
  attribution='&copy; OpenStreetMap contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
```

# Troubleshooting
Common Issues:
- Map not loading: Make sure the Leaflet CSS is correctly imported in App.tsx:
```import 'leaflet/dist/leaflet.css';```
- Custom markers not showing: Ensure that the path to the custom marker icon is correct and the image file exists.
- Localhost not working: If you encounter issues with Vite's dev server, try running:
```npm install --force```






