import React from "react";
import "./navbar.css";
import { FaUser, FaSignOutAlt, FaBook } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SiWikipedia } from "react-icons/si";
import avatar from '../../image/unnamed.gif';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";


export function Navbar() {
  const { user, disconnect } = useAuth()
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="avatar">
            <div className='avatar-div'>
              <img src={avatar} alt="avatar" className="avatarImg"/>
              <div className="avatarName">
                <h1>{user.firstName}&nbsp;{user.lastName}</h1>
                <div className="avatarStudy">
                  <p>Master&nbsp;1</p>
                <p>Développement&nbsp;web</p>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
              <MdDashboard size={30}/>
              <span className="link-text">Mon&nbsp;dashboard</span>
            </NavLink>
            </li>
          <li className="nav-item">
            <NavLink to="/profil" className="nav-link" activeClassName="active">
              <FaUser size={30}/>
              <span className="link-text">Mon&nbsp;profil</span>
            </NavLink>
          </li >
          {
            user.role === 'Teacher' ?
            <li className="nav-item">
              <NavLink to="/slides" className="nav-link" activeClassName="active">
              <FaBook size={30}/>
              <span className="link-text">Mes&nbsp;cours</span>
            </NavLink>
            </li>
            : ''
          }
          {
            user.role === 'Teacher' ?
            <li className="nav-item">
              <NavLink to="/wiki/validate" className="nav-link" activeClassName="active">
              <SiWikipedia size={30}/>
                <span className="link-text">Wikis&nbsp;élèves</span>
            </NavLink>
            </li>
            : <li className="nav-item">
              <NavLink to="/wiki" className="nav-link" activeClassName="active">
              <SiWikipedia size={30}/>
                <span className="link-text">Mes&nbsp;wikis</span>
            </NavLink>
            </li>
          }
            
            
            <li className="nav-item">
              <a className="nav-link" onClick={disconnect}>
              <FaSignOutAlt size={30}/>
              <span className="link-text">Se&nbsp;déconnecter</span>
            </a>
            </li>
          
          
        </ul>
        
      </nav>
    );
  }
  
