import { memo } from 'react'
import type { Location } from '../../types'

interface LocationSelectProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  locations: Location[]
}

export const LocationSelect = memo(({ value, onChange, locations }: LocationSelectProps) => {
  return (
    <div className="form-group">
      <label htmlFor="location" className="form-label">
        <span aria-hidden="true">📍</span> Pickup Location
      </label>
      <select
        id="location"
        name="location"
        value={value}
        onChange={onChange}
        required
        className="form-input"
      >
        <option value="">Select a pickup location</option>
        {locations.map((location: Location) => (
          <option key={location.id} value={location.id}>
            {location.code} - {location.Name}
          </option>
        ))}
      </select>
    </div>
  )
})
