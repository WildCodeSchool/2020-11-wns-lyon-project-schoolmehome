import React from 'react';
import { Button, Card } from 'react-bootstrap';
import calendar from '../../icons/Circle-icons-calendar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../themecolorbootstrap.scss';
import { Link } from 'react-router-dom';

type CardCalendarProps = {
    name: string,
    firstname?: string,
    id?:string,
}

export function CardCalendarList ({name, firstname, id}: CardCalendarProps){
    return(
        
        <Card style={{ width: '210px' }} border="dark" className="text-center">
            <Card.Img variant="top" src={calendar} style={{ width: '70%' }}/>
            <Card.Body>
                <Card.Title>{name} {firstname}</Card.Title>
                <Button variant="mediumlight"><Link to={`/calendar/${id}`}>Voir</Link></Button>
            </Card.Body>
        </Card>
    )
}