import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import { Location } from '../locationTypes'; // Import Location type
import { Scrollbars } from 'react-custom-scrollbars-2'; // Import Scrollbars for custom scrollbar styling
import OutlinedInput from '@mui/material/OutlinedInput';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from '../styles/Searchbox.module.scss'; // Import the SCSS styles

// Define TypeScript types for search result and component props
interface SearchResult {
  display_name: string;
  lat?: number; // Optional, as these might not be present in all search results
  lon?: number; // Optional, as these might not be present in all search results
}

interface SearchboxProps {
    selectPosition: Location | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<Location | null>>;
    locations: Location[];
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

// Base URL for Nominatim OpenStreetMap API
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

// Searchbox component
const Searchbox: React.FC<SearchboxProps> = ({ setLocations, setSelectPosition }) => {
  // State to manage search input and results
  const [searchText, setSearchText] = useState<string>(""); // Text input state
  const [results, setResults] = useState<SearchResult[]>([]); // Search results state

  // Function to handle search when the user initiates it
  const handleSearch = () => {
    // Construct query parameters for the Nominatim API
    const params = {
      q: searchText, // Query text input by the user
      format: 'json',
      addressdetails: '1', // Include address details in the response
      polygon_geojson: '0', // Do not include polygon geojson data
    };

    // Convert the params object to a URL query string
    const queryString = new URLSearchParams(params).toString();

    // Define the fetch request options
    const requestOptions: RequestInit = {
      method: "GET", // HTTP GET method
      redirect: "follow", // Handle redirects if necessary
    };

    // Make the API call to fetch search results
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result: SearchResult[]) => {
        // Convert search results to Location type if needed
        const locations: Location[] = result.map((item) => ({
          display_name: item.display_name,
          lat: item.lat ?? 0, // Default to 0 if lat is missing
          lon: item.lon ?? 0, // Default to 0 if lon is missing
        }));
        setResults(result); // Update state with search results
        setLocations(locations); // Update locations if needed
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle key press events in the input field
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <div className={styles['searchbox-container']}>
      <div className={styles['input-container']}>
        <div className={styles['input-wrapper']}>
          {/* Search input field with onChange and onKeyPress handlers */}
          <OutlinedInput
            className={styles['search-input']}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)} // Update search text on change
            onKeyPress={handleKeyPress} // Add key press handler
            placeholder="Search Leaflet Map"
          />
          <div className={styles['button-wrapper']}>
            {/* Search button with FontAwesome icon */}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles['search-button']}
              onClick={handleSearch} // Trigger search on button click
            />
          </div>
        </div>
      </div>

      {/* Conditionally render the results list if there are search results */}
      {results.length > 0 && (
        <div className={styles['result-container']}>
          {/* Custom scrollbars for the results container */}
          <Scrollbars style={{ height: 250 }} autoHide>
            <List className={styles['results-list']}>
              {/* Iterate through the search results and display each result */}
              {results.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => setSelectPosition({
                      display_name: item.display_name,
                      lat: item.lat ?? 0,
                      lon: item.lon ?? 0,
                    })} // Update selected position on item click
                  >
                    <ListItemIcon>
                      {/* Placeholder image for each search result */}
                      <img
                        src="./placeholder.png"
                        alt="placeholder"
                        style={{ width: "38px", height: "38px" }}
                      />
                    </ListItemIcon>
                    {/* Display the search result's display name */}
                    <ListItemText className={styles['result-text']} primary={item.display_name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

export default Searchbox;
