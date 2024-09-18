// Map.tsx
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet'; // Import LatLngExpression for typing positions
import '../styles/Maps.scss';  // Import SCSS file for styling

// Define the type for the selectPosition prop
interface SelectPosition {
    lat: number;
    lon: number;
    name?: string;
    description?: string;
    link?: string;
}

// Define the icon for the marker
const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38]
});

// Default map center position
const defaultPosition: LatLngExpression = [51.505, -0.09]; // Default position (London)

// Component to reset map view based on selected position
function ResetCenterView({ selectPosition }: { selectPosition?: SelectPosition }) {
    const map = useMap(); // Access the Leaflet map instance

    useEffect(() => {
        if (selectPosition) {
            // If a selectPosition is provided, set the map view to this position
            map.setView(
                L.latLng(selectPosition.lat, selectPosition.lon),
                map.getZoom(), // Maintain the current zoom level
                { animate: true } // Animate the view change
            );
        }
    }, [selectPosition, map]); // Dependency array includes selectPosition and map

    return null; // This component does not render anything visible
}

// Component for custom zoom controls
function CustomZoomControls() {
    const map = useMap(); // Access the Leaflet map instance

    useEffect(() => {
        // Create and add zoom in button
        const zoomInButton = new L.Control({ position: 'topright' });
        zoomInButton.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
            div.innerHTML = '<a href="#" class="leaflet-control-zoom-in">+</a>';
            L.DomEvent.on(div, 'click', () => map.zoomIn()); // Increase zoom level on click
            return div;
        };

        // Create and add zoom out button
        const zoomOutButton = new L.Control({ position: 'topright' });
        zoomOutButton.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
            div.innerHTML = '<a href="#" class="leaflet-control-zoom-out">-</a>';
            L.DomEvent.on(div, 'click', () => map.zoomOut()); // Decrease zoom level on click
            return div;
        };

        zoomInButton.addTo(map); // Add zoom in button to the map
        zoomOutButton.addTo(map); // Add zoom out button to the map

        // Cleanup on component unmount
        return () => {
            zoomInButton.remove();
            zoomOutButton.remove();
        };
    }, [map]); // Dependency array includes map

    return null; // This component does not render anything visible
}

// Component for custom layer toggle
function LayerToggleControl() {
    const map = useMap(); // Access the Leaflet map instance

    useEffect(() => {
        // Create and add layer toggle control
        const layerToggle = new L.Control({ position: 'topright' });
        layerToggle.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-control-layers leaflet-bar');
            div.innerHTML = '<a href="#" class="leaflet-control-layers-toggle">Layers</a>';
            L.DomEvent.on(div, 'click', () => {
                // Implement logic to toggle map layers here
            });
            return div;
        };

        layerToggle.addTo(map); // Add layer toggle control to the map

        // Cleanup on component unmount
        return () => {
            layerToggle.remove();
        };
    }, [map]); // Dependency array includes map

    return null; // This component does not render anything visible
}

// Main map component that displays the map and marker based on the selected location
interface MapsProps {
    selectPosition?: SelectPosition;  // Define optional selectPosition prop
}

const Maps: React.FC<MapsProps> = ({ selectPosition }) => {
    // Determine the initial center position of the map
    const initialPosition: LatLngExpression = selectPosition ? [selectPosition.lat, selectPosition.lon] : defaultPosition;

    return (
        <MapContainer center={initialPosition} zoom={13} className="map-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=Ihq2NNMlnxAj9kLqT4nO"
            />
            {selectPosition && (
                <Marker position={[selectPosition.lat, selectPosition.lon]} icon={icon}>
                    <Popup>
                        <strong>{selectPosition.name}</strong><br />
                        {selectPosition.description}<br />
                        <a href={selectPosition.link} target="_blank" rel="noopener noreferrer">More Info</a>
                    </Popup>
                </Marker>
            )}
            <ResetCenterView selectPosition={selectPosition} />
            <CustomZoomControls />
            <LayerToggleControl /> {/* Added layer toggle control */}
        </MapContainer>
    );
};

export default Maps;
