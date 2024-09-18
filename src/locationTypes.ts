// locationTypes.ts

// Type for a Location with basic information: display name, latitude, and longitude
export type Location = {
  display_name: string; // Name of the location
  lat: number;         // Latitude coordinate
  lon: number;         // Longitude coordinate
};

// Type for a search result with display name
export type SearchResult = {
  display_name: string; // Name of the search result
  // Additional properties specific to search results can be added here
};

// Interface for a selected position with optional additional details
export interface SelectPosition {
  lat: number;           // Latitude coordinate of the selected position
  lon: number;           // Longitude coordinate of the selected position
  name?: string;         // Optional name for the selected position
  description?: string;  // Optional description for the selected position
  link?: string;         // Optional link for more information
}
