import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../locationTypes';
import { Scrollbars } from 'react-custom-scrollbars-2'; // Import Scrollbars for custom scrollbar styling
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/Sidebar.module.scss';


// Define the props for the Sidebar component
interface SidebarProps {
  locations: Location[];  // List of locations to display in the sidebar
  onLocationClick: (location: Location) => void;  // Callback function to handle location selection
}

// Sidebar component definition
const Sidebar: React.FC<SidebarProps> = ({ locations, onLocationClick }) => {
  // State to manage the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Function to toggle the sidebar visibility
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className={`${styles['sidebar-container']} ${isSidebarOpen ? styles['open'] : styles['closed']}`}>
      {/* Button to toggle the sidebar visibility */}
      <div className={styles['toggle-button']}>
        <IconButton onClick={handleToggleSidebar} aria-label="Toggle sidebar">
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      
      {/* Render sidebar content if it is open */}
      {isSidebarOpen && (
        <>
          <h2>Locations</h2>
          <Scrollbars style={{ height: 600 }} autoHide>
          <List>
            {/* Render each location as a list item */}
            {locations.map((location, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onLocationClick(location)}>
                  {/* Icon representing the location */}
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className={styles['location-icon']}
                  />
                  {/* Display the location name */}
                  <ListItemText primary={location.display_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Scrollbars>
        </>
      )}
    </div>
  );
};

export default Sidebar;
