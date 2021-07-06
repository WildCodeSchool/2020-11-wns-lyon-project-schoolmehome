import React, { createContext, useState, FormEvent, useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';


export const AuthContext = createContext<any>({});

export function AuthProvider({ children }: { children: JSX.Element }) {
  let userStorage = {email : '',
    lastName: '',
    firstName: '',
    role: ''};
  if(localStorage.getItem('user')){
    userStorage = JSON.parse(localStorage.getItem('user')!);
  }
  const [token, setToken] = useState<any>(localStorage.getItem('authToken'))
  const [user, setUser] = useState<user>(userStorage)
  const [password, setPassword] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)
  return <AuthContext.Provider value={{ user, setUser, token, setToken, password, setPassword, alert, setAlert }}>{children}</AuthContext.Provider>;
}

export type user = {
  email : string,
  lastName: string,
  firstName: string,
  role: string
}



export const useAuth = () => {

  const { user, setUser, token, setToken, password, setPassword, alert, setAlert } = useContext(AuthContext)

  const SIGNIN = gql`
  mutation Signin (
    $email: String!
    $password: String!
  ) {
    signin(email: $email, password: $password){
      token
      user {
        _id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

  const [signin] = useMutation<any>(SIGNIN);


  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    signin({ variables: { email: user.email, password: password } })
      .then((data: any) => {
        const result = data.data.signin
        if (result) {
          console.log(result, 'titi')
          setToken(result.token)
          setUser({firstName: result.user.firstName, lastName: result.user.lastName, role: result.user.role, email: result.user.email, id: result.user._id,})
          setPassword(null)
          localStorage.setItem('authToken', result.token)
          localStorage.setItem('user', JSON.stringify({firstName: result.user.firstName, lastName: result.user.lastName, role: result.user.role, id: result.user._id, email: result.user.email }))
        } else {
          setAlert(true)
        }
      })
      .catch((err: any) => console.error(err))

  }

  const disconnect = () => {
    setToken(null)
    setUser({})
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  const handleCloseMui = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  return {
    inputEmail: {
      value: user.email,
      onChange: (e: FormEvent<HTMLInputElement>) => setUser({...user, email: e.currentTarget.value}),
    },
    inputPassword: {
      value: password,
      onChange: (e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value),
    },
    token,
    setToken,
    formSubmit,
    user,
    disconnect,
    alert,
    handleCloseMui
  }
}