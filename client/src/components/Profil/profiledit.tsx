import { gql, useMutation, useQuery } from "@apollo/client";
import { Input } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from "../global/button/Button";
import { ProfilInfo } from "./profil";
import './profil.css'

const initialUser = {
    _id : '',
    firstName : '',
    lastName :'',
    email : '',
    phone : '',
    birthdate : '',
    street : '',
    zipcode : '',
    city : '',
}
const reducer = (state : ProfilInfo, action : any) => {
    switch (action.type){
        case 'init':
            console.log(action.user)
            return {...state, ...action.user};
        case 'name':
            return {...state, lastName : action.value}
        case 'firstname':
            return {...state, firstName : action.value}
        case 'phone':
            return {...state, phone : action.value}
        case 'birth':
            return {...state, birthdate : action.value}
        case 'street':
            return {...state, street : action.value}
        case 'zip':
            return {...state, zipcode : action.value}
        case 'city':
            return {...state, city : action.value}
        default:
            return state;
    }
}

export const ProfilEdit = () => {
    const [state, dispatch] = useReducer(reducer, initialUser);
    const history = useHistory();
    const {user} = useAuth();
    const GET_USER = gql`
      query findUser($email: String!){
        getOne(email : $email) {_id, firstName, lastName, email, phone, birthdate, street, zipcode, city}
      }
    `;

    const {data, loading, error } = useQuery(GET_USER, {variables : {email :user.email}, fetchPolicy: 'network-only'});
    
    useEffect(() => {
        if(user){
            if(data){
                dispatch({type: 'init', user : data.getOne});
            }
            }
    }, [user, data])

    const UPADTE_USER = gql`
    mutation updateUser($data: UserInput!){
        update(data : $data) {_id}
    }
    `;
    const [updateUser] = useMutation(UPADTE_USER);

    const save = () => {
        console.log('save')
        updateUser({variables :  {data : {...state,role : user.role, __typename : undefined}}})
            .then(() => history.push('/profil'))
            .catch(e => console.log(JSON.stringify(e, null, 4)))    
    }

    return (
        <div>
            <div className="top">
                    <h2>EDITER MON PROFIL</h2>
            </div>
            <div>
                    <div className='profilformrow'>
                        <div className='profileditlabel'>Nom</div>
                    <Input type='text'className='profiledit' value={state.lastName} onChange={(e) => dispatch({type: 'name', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Prénom</div>
                    <Input type='text'className='profiledit' value={state.firstName}  onChange={(e) => dispatch({type: 'firstname', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Téléphone</div>
                    <Input type='text'className='profiledit' value={state.phone}  onChange={(e) => dispatch({type: 'phone', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Date d'anniversaire</div>
                    <Input type='text'className='profiledit' value={state.birthdate}  onChange={(e) => dispatch({type: 'birth', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Rue</div>
                    <Input type='text'className='profiledit' value={state.street}  onChange={(e) => dispatch({type: 'street', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Code postal</div>
                    <Input type='text'className='profiledit' value={state.zipcode}  onChange={(e) => dispatch({type: 'zip', value : e.target.value})} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Ville</div>
                    <Input type='text'className='profiledit' value={state.city}  onChange={(e) => dispatch({type: 'city', value : e.target.value})} />
                    </div>
                    <div style={{textAlign : 'center'}}><Button onClick={save}>Enregister mes modifications</Button></div>
            </div>
        </div>
    )
}