import React, { FormEvent, useEffect, useState } from 'react';
import { Breadcrumb, Button, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

export default function NewCalendarForm (){

    
    const [teachers, setTeachers] = useState([]);
    const [intervenantSelected , setIntervenantSelected ] = useState('');

    const getTeachers = async () => {
        try {
            const resultList = await Axios.get('http://localhost:3000/api/teacher');
            console.log(resultList.data.result);
            let tri = resultList.data.result.filter(filterNoLesson);
            setTeachers(tri);
            console.log(tri[0]['_id']);
            setIntervenantSelected(tri[0]['_id']);
        } catch (error) {
            console.log(error)
        }
    }

    const filterNoLesson = (element:any) => {
        if(element.lessons.length === 0) return element;
    }

    useEffect(() => {
        getTeachers();
    }, [])

    return(
        <div>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                    Gestion
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Paramètres
                </Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-center">Paramètres du nouveau calendrier</h2>
            <Form id='form'>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Choisir un intervenant :</Form.Label>
                    <Form.Control as="select" onChange={(e) => setIntervenantSelected(e.target.value)}>
                        { teachers.map( ({user, _id}: any) => (<option value={_id}>{user.firstName} {user.lastName}</option>))}
                    </Form.Control>
                </Form.Group>
                <div className="text-center mt-4">
                    <Button variant="mediumlight" ><Link to={`/calendar/${intervenantSelected}`}>Valider</Link></Button>
                </div>
            </Form>
        </div>
    )
}