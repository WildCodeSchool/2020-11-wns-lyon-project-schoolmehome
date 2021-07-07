import React from 'react'
import ButtonMUI from '@material-ui/core/Button'
import './Button.css'

const Button = ({ children, type, onClick, style }: any) => {
  return (
    <ButtonMUI style={style} className="button" type={type} onClick={onClick}>{children}</ButtonMUI>
  )
}

export default Button
