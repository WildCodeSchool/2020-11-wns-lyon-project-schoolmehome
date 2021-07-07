import React, { useContext, ReactElement } from 'react'
import { AuthContext, useAuth } from '../../context/authContext'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  const { token } = useAuth()
  // console.log(token)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!token ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;