import React from 'react';
import Login from './components/login/Login';
import SlideCreation from './components/slideCreation/SlideCreation';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext, useAuth } from './context/authContext'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import './App.css';
import './index.css'
import { Navbar } from './components/navbar/navbar';
import { AuthProvider } from './context/authContext'
import {DashboardAdmin} from "./components/dashboard/dashboard-admin/DashboardAdmin";
import { DashboardRouting } from './components/dashboard/DashboardRouting';
import { Profil } from './components/Profil/profil';
import { SlidesHome } from './components/Slides/SlidesHome';

function App() {

  const routes = [
    {
      path: "/dashboard",
      exact: true,
      main: () => <DashboardRouting/>
      // main: () => <h2>Home Dashboard</h2>
      // main: () => <DashboardAdmin />
    },
    {
      path: "/profil",
      exact: true,
      main: () => <Profil />
    },
    {
      path: "/cours",
      exact: true,
      main: () => <h2>Mes cours</h2>
    },
    {
      path: "/slides/creation",
      exact: true,
      main: () => <SlideCreation />
    },
    {
      path: "/slides",
      exact: true,
      main: () => <SlidesHome />
    }
  ];
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Redirect to="/dashboard" />
              <Navbar />
              <main>
                <Switch>
                  {routes.map((route, index) => (
                    <PrivateRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={route.main()}
                    />
                  ))}
                </Switch>
              </main>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
