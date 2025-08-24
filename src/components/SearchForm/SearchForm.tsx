import { useState, useMemo, useCallback } from 'react'
import { Header } from '../Header'
import { LocationSelect } from '../LocationSelect'
import { DateInput } from '../DateInput'
import { TimeInput } from '../TimeInput'
import { TestErrorButton } from '../TestErrorButton'
import type { FormData } from '../../types'
import locationsData from '../../assets/Locations.json'

export const SearchForm = () => {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    pickUpDate: '',
    dropOffDate: '',
    pickUpTime: '',
    dropOffTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Memoize date calculations to prevent recalculation on every render
  const { today, tomorrow } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return { today, tomorrow }
  }, [])

  // Memoize the change handler to prevent child re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  // Memoize the submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create query string with the required keys
      const queryParams = new URLSearchParams({
        locid: formData.location,
        pdate: formData.pickUpDate,
        ddate: formData.dropOffDate,
        ptime: formData.pickUpTime,
        dtime: formData.dropOffTime
      })

      // Redirect to new page with query string
      window.location.href = `result.html?${queryParams.toString()}`
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
    }
  }, [formData])

  return (
    <main className="travel-widget" role="main">
      <Header 
        title="Car Rental Search" 
        subtitle="Find your perfect rental car" 
      />
      
      <form onSubmit={handleSubmit} className="search-form" aria-labelledby="form-title">
        <h2 id="form-title" className="visually-hidden">Car Rental Search Form</h2>
        <LocationSelect
          value={formData.location}
          onChange={handleInputChange}
          locations={locationsData}
        />

        <div className="form-row">
          <DateInput
            id="pickUpDate"
            name="pickUpDate"
            label="📅 Pickup Date"
            value={formData.pickUpDate}
            onChange={handleInputChange}
            min={today}
            required
          />

          <DateInput
            id="dropOffDate"
            name="dropOffDate"
            label="📅 Return Date"
            value={formData.dropOffDate}
            onChange={handleInputChange}
            min={formData.pickUpDate || tomorrow}
            required
          />
        </div>

        <div className="form-row">
          <TimeInput
            id="pickUpTime"
            name="pickUpTime"
            label="🕐 Pickup Time"
            value={formData.pickUpTime}
            onChange={handleInputChange}
            required
          />

          <TimeInput
            id="dropOffTime"
            name="dropOffTime"
            label="🕐 Return Time"
            value={formData.dropOffTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="search-button"
          disabled={isSubmitting}
        >
          <span aria-hidden="true">🔍 </span>
          {isSubmitting ? 'Searching...' : 'Search Available Cars'}
        </button>
        
        <div className="test-error-button-wrapper">
          <TestErrorButton />
        </div>
      </form>
    </main>
  )
}
