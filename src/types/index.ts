export interface Location {
  id: number
  code: string
  Name: string
}

export interface FormData {
  location: number | ''  // Changed from string to number | '' to match the actual select values
  pickUpDate: string
  dropOffDate: string
  pickUpTime: string
  dropOffTime: string
}

// Type for the locations data import
export type LocationsData = Location[]
