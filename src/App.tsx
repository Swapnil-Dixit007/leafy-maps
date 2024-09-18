import { useState } from 'react';
import Sidebar from './components/Sidebar'; // Component for displaying the sidebar with locations
import SearchBox from './components/SearchBox'; // Component for searching and adding locations
import Map from './components/Map'; // Component for displaying the map with markers
import { Location, SelectPosition } from './locationTypes';// Import Location type
import 'leaflet/dist/leaflet.css'; // Load default styles for Leaflet maps
import './App.scss'; // Import custom SCSS styles for the app


function App() {
  // Initial list of locations. These can be static or dynamically updated.
  const initialLocations: Location[] = [
    { display_name: 'London', lat: 51.5074, lon: -0.1278 },
    { display_name: 'New York', lat: 40.7128, lon: -74.006 },
    { display_name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { display_name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { display_name: 'Germany', lat: 51.1657, lon: 10.4515 }, // Approximate center of Germany
    { display_name: 'Switzerland', lat: 46.8182, lon: 8.2275 }, // Approximate center of Switzerland
    { display_name: 'Italy', lat: 41.8719, lon: 12.5674 }, // Approximate center of Italy
    { display_name: 'Singapore', lat: 1.3521, lon: 103.8198 }, // Approximate center of Singapore
  ];

  // State to hold the currently selected position (from sidebar or search results)
  const [selectPosition, setSelectPosition] = useState<Location | null>(null);

  // State to manage the list of locations (initially populated with static data)
  const [locations, setLocations] = useState<Location[]>(initialLocations);

  // Function to handle the click event on a location in the sidebar
  const handleLocationClick = (location: Location) => {
    setSelectPosition(location); // Update the selected position state
  };

  const mapsPosition: SelectPosition | undefined = selectPosition 
        ? { lat: selectPosition.lat, lon: selectPosition.lon, name: selectPosition.display_name } 
        : undefined;

  return (
    <div className="app-container">
      {/* Sidebar component displaying the list of locations */}
      <Sidebar
        locations={locations}
        onLocationClick={handleLocationClick} // Pass function to handle location clicks
      />

      {/* Map section displaying the map and marker */}
      <div className="map-section">
        {/* Pass the selected position to the Maps component for rendering */}
        <Map selectPosition={mapsPosition} />
      </div>

      {/* Searchbox section for searching and adding new locations */}
      <div className="searchbox-section">
        <SearchBox
          selectPosition={selectPosition} // Pass the selected position to searchbox
          setSelectPosition={setSelectPosition} // Function to update selected position
          locations={locations} // Pass the current list of locations to searchbox
          setLocations={setLocations} // Function to update the list of locations
        />
      </div>
    </div>
  );
}

export default App;
