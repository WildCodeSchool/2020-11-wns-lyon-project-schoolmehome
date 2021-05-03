import React from 'react'
import ButtonMUI from '@material-ui/core/Button'
import './Button.css'

const Button = ({ children, type, onClick }: any) => {
  return (
    <ButtonMUI className="button" type={type} onClick={onClick}>{children}</ButtonMUI>
  )
}

export default Button
