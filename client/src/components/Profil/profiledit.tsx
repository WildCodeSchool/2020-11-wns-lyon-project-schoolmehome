import { gql, useQuery } from "@apollo/client";
import { Input } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext";
import Button from "../global/button/Button";
import { ProfilInfo } from "./profil";
import './profil.css'



export const ProfilEdit = () => {
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

    const save = () =>{

    }
    return (
        <div>
            <div className="top">
                    <h2>EDITER MON PROFIL</h2>
            </div>
            <div>
                    <div className='profilformrow'>
                        <div className='profileditlabel'>Nom</div>
                    <Input type='text'className='profiledit' value={info ? info.lastName : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Prénom</div>
                    <Input type='text'className='profiledit' value={info ? info.firstName : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Téléphone</div>
                    <Input type='text'className='profiledit' value={info ? info.phone : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Date d'anniversaire</div>
                    <Input type='text'className='profiledit' value={info ? info.birthdate : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Rue</div>
                    <Input type='text'className='profiledit' value={info ? info.street : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Code postal</div>
                    <Input type='text'className='profiledit' value={info ? info.zipcode : ''} />
                    </div>
                    <div className='profilformrow'><div className='profileditlabel'>Ville</div>
                    <Input type='text'className='profiledit' value={info ? info.city : ''} />
                    </div>
                    <div style={{textAlign : 'center'}}><Button onClick={save()}>Enregister mes modifications</Button></div>
            </div>
        </div>
    )
}