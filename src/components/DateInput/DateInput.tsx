import { memo } from 'react'

interface DateInputProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  required?: boolean
}

export const DateInput = memo(({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  min, 
  required = false 
}: DateInputProps) => {
  const labelText = label.replace(/[📅🕐]/gu, '').trim()
  const emoji = label.match(/[📅🕐]/u)?.[0] || ''
  
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <span aria-hidden="true">{emoji}</span> {labelText}
        {required && <span className="required-indicator" aria-label="required">*</span>}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        className="form-input"
      />
    </div>
  )
})
