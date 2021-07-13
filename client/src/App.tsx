import React, { useEffect } from 'react';
import Login from './components/login/Login';
import SlideCreation from './components/slideCreation/SlideCreation';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from './components/privateRoute/PrivateRoute'
import './App.css';
import './index.css'
import { Navbar } from './components/navbar/navbar';
import { AuthProvider } from './context/authContext'
import { DashboardRouting } from './components/dashboard/DashboardRouting';
import Visio from './components/visio/Visio';
import { Profil } from './components/Profil/profil';
import { SlidesHome } from './components/Slides/SlidesHome';
import SlideEdit from './components/Slides/SlideEdit';
import { ProfilEdit } from './components/Profil/profiledit';
import { Wiki } from './components/wiki/Wiki';
import { WikiRead } from './components/wiki/WikiRead';
import { WikiNew } from './components/wiki/WikiNew';
import { WikiEdit } from './components/wiki/WikiEdit';
import { WikiValidate } from './components/wiki/WikiValidate';
import Calendar from './components/calendar/Calendar';

function App() {

  useEffect(() => {
    document.title = "SchoolMeHome"
  }, [])

  const routes = [
    {
      path: "/dashboard",
      exact: true,
      main: () => <main><DashboardRouting/></main>
    },
    {
      path: "/profil",
      exact: true,
      main: () => <main className='bg'><Profil /></main>
    },
    {
      path: "/profil/edit",
      exact: true,
      main: () => <main className='bg'><ProfilEdit /></main>
    },
    {
      path: "/cours",
      exact: true,
      main: () => <main><h2>Mes cours</h2></main>
    },
    {
      path: "/slides/creation",
      exact: true,
      main: () => <main><SlideCreation /></main>
    },
    {
      path: "/visio/:id",
      exact: true,
      main: () => <main><Visio /></main>
    },
    {
      path: "/slides",
      exact: true,
      main: () => <main><SlidesHome /></main>
    },
    {
      path: "/slides/edit/:id",
      exact: true,
      main: () => <main><SlideEdit /></main>
    }, 
    {
      path: "/wiki/validate",
      exact: true,
      main: () => <main><WikiValidate /></main>
    },
    {
      path: "/wiki",
      exact : true,
      main: () => <main><Wiki /></main>
    },
    {
      path: "/wiki/new",
      exact : true,
      main: () => <main><WikiNew /></main>
    },
    {
      path: "/wiki/:id",
      exact: true,
      main: () => <main><WikiRead /></main>
    },
    {
      path: "/wiki/edit/:id",
      exact: true,
      main: () => <main><WikiEdit /></main>
    },
    {
      path: "/calendar",
      exact: true,
      main: () => <main><Calendar /></main>
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
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
