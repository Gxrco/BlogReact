import React from 'react'

function InputField ({
  label, type, value, onChange
}) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={label} />
    </div>
  )
}

export default InputField
