import React from 'react'
import './Input2.css'
import TextField from '@material-ui/core/TextField'

type InputType = {
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: any;
  style?: any;
}


const Input2 = ({ className, placeholder, type, value, onChange, style }: InputType) => {

  return (
    <TextField
      className='input2'
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      style={style}
    />
  )
}

export default Input2
