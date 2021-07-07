import React, { useEffect, useState } from 'react';
import './gestionList.css';
import { ButtonDouble, ButtonLeft, ButtonRight } from './gestionListstyle';
import { Link } from "react-router-dom";
import add from "../../icons/add_white.png";
import { CardColumns } from 'react-bootstrap';
import { CardCalendarList } from './cardCalendarList';
import Axios from 'axios';

export default function GestionList (){
    const [showList, setShowList] = useState(true);

    return(
        <div>
            <div className='gestionTitre'>
                <h1>Gestion des planning</h1>
                <div className='gestionBouton'>
                    <div className="bouton_4">
                    <Link to="/new"><img className="image" src={add} alt="plus"/>
                        <span className="texteduboutton_4">Nouveau&nbsp;calendrier</span></Link>
                    </div>
                </div>
            </div>
            <ButtonDouble>
                <ButtonLeft onClick={() => setShowList(true)} className={ showList ? 'active' : ''}>Intervenants</ButtonLeft>
                <ButtonRight onClick={() => setShowList(false)} className={ showList ? '' : 'active'}>Promotions</ButtonRight>
            </ButtonDouble>
            <div>
                { showList ? <IntervenantListCalendar/> : <PromotionListCalendar/> }
            </div>
        </div>
    )
}

// Liste des intervenants
function IntervenantListCalendar (){
    const [teachers, setTeachers] = useState([]);

    const getTeachers = async () => {
        try {
            const resultList = await Axios.get('http://localhost:3000/api/teacher/has_lesson');
            // console.log(resultList.data.result);
            setTeachers(resultList.data.result);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeachers();
    }, [])

    return(
        <CardColumns>
            {teachers.map( ({user, _id}: any) => (<CardCalendarList name={user.firstName} firstname={user.lastName} id={_id}></CardCalendarList>))}
        </CardColumns>
    )
}

//liste des promotions


function PromotionListCalendar (){
  const [promotions, setPromotions] = useState([]);
  const getPromotions = async () => {
      const resultList = await Axios.get('http://localhost:3000/api/promo/has_lesson')
      console.log(resultList.data.result);
      setPromotions(resultList.data.result);
  }
  useEffect(() => {
      getPromotions();
  }, [])
  return(
      <CardColumns>
          {promotions.map( ({name, _id}, key) => (<CardCalendarList name={name} id={_id}></CardCalendarList>))}
      </CardColumns>
  )
}