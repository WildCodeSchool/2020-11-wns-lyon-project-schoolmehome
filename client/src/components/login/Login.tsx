import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Redirect, NavLink } from 'react-router-dom'
import './Login.css'
import Button from '../global/button/Button';
import Input from '../global/input/Input';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Input2 from '../global/input2/Input';


const Login = () => {
  const { inputEmail, inputPassword, formSubmit, token, alert, handleCloseMui } = useAuth()

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  if (!!token) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    )
  } else {
    return (
      <div className="main-login-page">
        <div className="login-page">
          <nav className="login-nav-container">
            <div>
              <NavLink to="#" className="navlink-login">Help</NavLink>
              <NavLink to="#" className="navlink-login">Contact us</NavLink>
            </div>
          </nav>
          <div className="login-main-container">
            <div className="login-left-container">
              <h1>SCHOOL ME <br /> HOME</h1>
            </div>
            <div className="login-right-container">
              <form onSubmit={formSubmit} className="login-form-container">
                <Input2 style={{ marginBottom: "50px" }} type="email" placeholder="Enter email" {...inputEmail} />
                <Input2 style={{ marginBottom: "60px" }} type="password" placeholder="Enter password" {...inputPassword} />
                <Button type="submit" style={{ fontSize: "1.25rem" }}>Se connecter</Button>
                <NavLink to="/lostPassword" className="navlink-lost">Mot de passe oublié ?</NavLink>
              </form>
            </div>
          </div>
          <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseMui}>
            <Alert onClose={handleCloseMui} severity='error'>
              L'adresse email et le mot de passe ne correspondent pas.
            </Alert>
          </Snackbar>
        </div>
      </div>
    )
  }
}

export default Login
