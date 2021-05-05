import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import './profil.css'
import avatar from '../../image/unnamed.gif';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FaBirthdayCake } from 'react-icons/fa';

export type ProfilInfo = {
    _id : string,
    firstName : string | null,
    lastName : string | null,
    email : string,
    phone : string | null,
    birthdate : string | null,
    street : string | null,
    zipcode : string | null,
    city : string | null,
  }

export const Profil = () => {
    const classes = useStyles();
    const {user} = useAuth();
    const GET_USER = gql`
      query findUser($email: String!){
        getOne(email : $email) {_id, firstName, lastName, email, phone, birthdate, street, zipcode, city}
      }
    `;
    const [info, setInfo] = useState<ProfilInfo>();
    const {data, loading, error } = useQuery(GET_USER, {variables : {email :user.email}, fetchPolicy: 'network-only'});
    useEffect(() => {
            if(data){
                setInfo(data.getOne);
            }
    }, [data])
    return (
            <div>
                <div className="top">
                    <h2>Mon profil</h2>
                </div>
                <div className="header-profil">
                    <Avatar alt="" src={avatar} className={classes.large} />
                    <div className="profil-info">
                        <div className="name">{info ? info.firstName : ''} {info ? info.lastName : ''}</div>
                        <div className="group">M1 - Développement Web | Groupe 1</div>
                    </div>
                </div>
                <div className="profil-info-1">
                    <div className="profil-card">
                        <h3>Mes compétences</h3>
                    </div>
                    <div className="profil-card">
                        <h3>Mes notes et devoirs</h3>
                    </div>
                </div>
                <div className="profil-info-1">
                    <div className='profil-card'>
                        <h3>Mes informations personnelles</h3>
                        <div className='profil-card-content'>
                            <ul>
                                <li><FaBirthdayCake /> {info ? info.birthdate : ''}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        
    )
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }),
);