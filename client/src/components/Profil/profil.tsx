import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import './profil.css'
import avatar from '../../image/unnamed.gif';
import books from '../../icons/hobbies/book.png';
import flute from '../../icons/hobbies/flute.png';
import puzzle from '../../icons/hobbies/puzzle-pieces.png';
import vgames from '../../icons/hobbies/videogames.png';
import docker from '../../icons/lessons/Docker.png';
import flutter from '../../icons/lessons/Flutter.png';
import gqli from '../../icons/lessons/GQL.png';
import rn from '../../icons/lessons/RN.png';
import ts from '../../icons/lessons/Ts.png';
import fr from '../../icons/lessons/study.png';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FaBirthdayCake, FaPhone } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { IoLocationSharp } from 'react-icons/io5';

import { Link } from 'react-router-dom';
import Button from '../global/button/Button';


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
                        <h3>Mes Notes</h3>
                        <div className='profil-card-content flex-around'>
                        <div className="grid-1-2">
                                <img className='profil-img' src={docker} alt='docker' title='docker'/><div className='desc'>15 / 20</div>
                                <img className='profil-img' src={flutter} alt='flutter' title='flutter'/><div className='desc'>11 / 20</div>
                                <img className='profil-img' src={gqli} alt='graphQl' title='graphQl'/><div className='desc'>05 / 20</div>
                            </div>
                            <div className='grid-1-2'>
                                <img className='profil-img' src={rn} alt='react native' title='react native'/><div className='desc'>18 / 20</div>
                                <img className='profil-img' src={ts} alt='typescript' title='typescript'/><div className='desc'>20 / 20</div>
                                <img className='profil-img' src={fr} alt='français' title='français'/><div className='desc'>19 / 20</div>
                            </div>
                        </div>
                    </div>
                    <div className="profil-card">
                        <h3>Mes centres d'intérêts</h3>
                        <div className='profil-card-content flex-around'>
                            <div className="grid-1-2">
                                <img className='profil-img' src={books} alt='Lecture' title='Lecture'/><div className='desc'>Lecture</div>
                                <img className='profil-img' src={puzzle} alt='Puzzle' title='Puzzle'/><div className='desc'>Puzzle</div>
                            </div>
                            <div className='grid-1-2'>
                                <img className='profil-img' src={flute} alt='Jouer de la musique' title='Jouer de la musique'/><div className='desc'>Jouer de la musique</div>
                                <img className='profil-img' src={vgames} alt='Jeux vidéos' title='Jeux vidéos'/><div className='desc'>Jeux videos</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profil-info-1">
                    <div className='profil-card'>
                        <h3>Mes informations personnelles</h3>
                        <div className='profil-card-content flex-around'>
                            <div className="grid-1-2 mg-6">
                                <FaBirthdayCake color="#f05454" size={20}/> <div>{info ? info.birthdate : ''}</div>
                                <FaPhone color="#f05454" size={20}/><div>{info ? info.phone : ''}</div>
                                <HiMail color="#f05454" size={20}/><div>{info ? info.email : ''}</div>
                            </div>
                            <div className="grid-1-2">
                                <IoLocationSharp color="#f05454" size={20}/><div>{info ? info.street : ''} </div>
                                <div></div><div>{info ? info.zipcode : ''} {info ? info.city : ''}</div>
                                <div></div><div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{textAlign : 'center'}}>
                    <Link to='/profil/edit' className="link"><Button>Editer mon profil</Button></Link>
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