export interface Location {
  id: number
  code: string
  Name: string
}

export interface FormData {
  location: string
  pickUpDate: string
  dropOffDate: string
  pickUpTime: string
  dropOffTime: string
}

// Type for the locations data import
export type LocationsData = Location[]
