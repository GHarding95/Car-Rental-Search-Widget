declare module "*.json" {
  const value: unknown
  export default value
}

// Specific declaration for locations.json
declare module "../../assets/Locations.json" {
  import { LocationsData } from "../types"
  const value: LocationsData
  export default value
}
