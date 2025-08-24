import { useState } from 'react'

export const TestErrorButton = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false)

  // This will trigger the error boundary when shouldThrowError is true
  if (shouldThrowError) {
    throw new Error('🧪 Test Error: This is a simulated error to test the Error Boundary!')
  }

  return (
    <button 
      type="button" 
      className="test-error-button"
      onClick={() => {
        setShouldThrowError(true)
      }}
    >
      🧪 Test Error
    </button>
  )
}
