import { memo } from 'react'

interface TimeInputProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export const TimeInput = memo(({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  required = false 
}: TimeInputProps) => {
  const labelText = label.replace(/[📅🕐]/gu, '').trim()
  const emoji = label.match(/[📅🕐]/u)?.[0] || ''
  
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <span aria-hidden="true">{emoji}</span> {labelText}
        {required && <span className="required-indicator" aria-label="required">*</span>}
      </label>
      <input
        type="time"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  )
})
