// JSON module declarations - keeping minimal for other potential JSON imports
declare module "*.json" {
  const value: unknown
  export default value
}
