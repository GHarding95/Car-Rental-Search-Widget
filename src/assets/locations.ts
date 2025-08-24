import type { LocationsData } from '../types/index'

// Import the raw JSON data
const rawLocationsData = [
  {
    "id": 1,
    "code": "LGW",
    "Name": "London Gatwick Airport"
  },
  {
    "id": 2,
    "code": "FAO",
    "Name": "Faro Airport"
  },
  {
    "id": 3,
    "code": "LIS",
    "Name": "Lisbon Airport"
  },
  {
    "id": 4,
    "code": "FCO",
    "Name": "Fiumicino Airport"
  }
] as const

// Validate and type the data
export const locationsData: LocationsData = rawLocationsData.map(location => ({
  id: location.id,
  code: location.code,
  Name: location.Name
}))

export default locationsData
