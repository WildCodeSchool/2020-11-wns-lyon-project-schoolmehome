import React from "react";
import "./navbar.css";
import { FaUser, FaSignOutAlt, FaBook, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SiWikipedia } from "react-icons/si";
import avAdmin from '../../image/admin2.jpg';
import avUser from '../../image/user2.jpg';
import avTeacher from '../../image/teacher.jpg';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";


export function Navbar() {
  const { user, disconnect } = useAuth()
  const u = useUser();
  const classes = useStyles();
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="avatar">
          <div className='avatar-div'>
                    {
                        u.user?.getOne.imageUrl ?
                        <Avatar alt="" src={u.user?.getOne.imageUrl} className={classes.large} /> : <Avatar alt="" src={avUser} className={classes.large} />
                    }
            <div className="avatarName">
              <h1>{user.firstName}&nbsp;{user.lastName}</h1>
              <div className="avatarStudy">
                        {
                            user.role === 'User' ?
                            <p>{u.user?.getOne.promo[0].name ? u.user?.getOne.promo[0].name : 'Pas de promotion'}</p>
                            : <p>{user.role}</p>
                        }
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
          <li className="nav-item">
            <NavLink to="/calendar" className="nav-link" activeClassName="active">
              <FaCalendarAlt size={30} />
              <span className="link-text">Mon&nbsp;calendrier</span>
            </NavLink>
          </li>
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
            </li> : ''}
            {
              user.role === 'User' ?
              <li className="nav-item">
              <NavLink to="/wiki" className="nav-link" activeClassName="active">
              <SiWikipedia size={30}/>
                <span className="link-text">Mes&nbsp;wikis</span>
            </NavLink>
            </li> : ''
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
  

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  }),
);