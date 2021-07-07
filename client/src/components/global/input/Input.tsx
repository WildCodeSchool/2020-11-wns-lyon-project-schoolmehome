import React from 'react'
import './Input.css'
import TextField from '@material-ui/core/TextField'

type InputType = {
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: any;
  style?: any;
}


const Input = ({ className, placeholder, type, value, onChange, style }: InputType) => {

  return (
    <TextField
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      style={style}
    />
  )
}

export default Input
