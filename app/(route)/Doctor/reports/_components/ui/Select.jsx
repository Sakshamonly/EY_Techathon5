import React from "react"

export const Select = ({ options, value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
