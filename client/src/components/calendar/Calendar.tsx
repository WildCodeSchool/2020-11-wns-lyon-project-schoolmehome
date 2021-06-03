import React, { ReactElement, useState, FormEvent, useEffect } from 'react';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../global/button/Button';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useUser from '../../hooks/useUser';
import { Input, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import LessonType from '../../types/lessonType';
import { gql, useQuery, useMutation } from '@apollo/client';
import useSubjects from '../../hooks/useSubjects';

const Calendar = (): ReactElement => {

  const NEW_LESSON = gql`
  mutation addLesson (
    $_id: String!
    $data: LessonInput!
  ) {
    addLesson(_id: $_id, data: $data){
      _id
    }
  }
`;

const UPDATE_LESSON = gql`
mutation updateLesson (
  $_id: String!
  $data: LessonInput!
) {
  UpdateLesson(_id: $_id, data: $data){
    _id
  }
}
`;

  const [lessons, setLessons] = useState<EventInput[]>([])
  const [newLesson, setNewLesson] = useState<LessonType>({
    start: '',
    end: '',
    subject: { name: '', _id: '' },
    promo: ''
  })
  const [show, setShow] = useState<boolean>(false);
  const { subjects } = useSubjects();
  const [promos, setPromos] = useState<{ _id: string, name: string }[]>([]);
  const { user } = useUser();
  const [createLesson] = useMutation<any>(NEW_LESSON);
  const [updateLesson] = useMutation<any>(UPDATE_LESSON);

  // const [form, setForm] = useState({ subject: "", promo: "" })
  // let { id }: { id: string } = useParams();
  // let prof: any = intervenant.find((i: any) => id === i._id);


  useEffect(() => {
    if (user) {
      setLessons(user.getOne.lessons.map((d: any): EventInput => {
        return ({
          id: d._id,
          title: `${d.promo} / ${d.subject.name}`,
          start: d.start,
          end: d.end
        })
      }))
    }

    // const fetchData = async () => {
    //   console.log(process.env.REACT_APP_API_URL)
    //   try {
    //     getTeachers();
    //     const resultSubject = await axios(`${process.env.REACT_APP_API_URL}/api/subject`);
    //     setSubjects(resultSubject.data.result);
    //     const resultPromo = await axios('http://localhost:3000/api/promo');
    //     setPromos(resultPromo.data.result);
    //     const resultLessons = await axios(`http://localhost:3000/api/teacher/lessons/${id}`);
    //     setLessons(resultLessons.data.result.lessons.map((d: any): EventInput => {
    //       return ({
    //         id: d._id,
    //         title: `${resultSubject.data.result.find((s: any) => d.subject === s._id).name} / ${d.name}`,
    //         start: d.start,
    //         end: d.end
    //       })
    //     }))
    //     setNewLesson({ ...newLesson, subject: { name: resultSubject.data.result[0].name, id: resultSubject.data.result[0]._id }, promo: resultPromo.data.result[0].name })
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
  }, [user])

  useEffect(() => {
    console.log(subjects)
  }, [subjects])

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  const handleChange = (e: any) => {
    setNewLesson({ ...newLesson, [e.target.name]: e.target.value })
  }
  const handleChangeSubject = (e: any) => {
    console.log(e.target.value)
    console.log(subjects.getAllSubjects.find((s: any) => s._id == e.target.value))
    setNewLesson({ ...newLesson, subject: { _id: e.target.value, name: subjects.getAllSubjects.find((s: any) => s._id == e.target.value)?.name } })
  }
  const handleSubmit = () => {
    createLesson({ variables: { _id: user.getOne._id, data: newLesson } })
    .then((d: any) => {
      setLessons([...lessons, { id: `${d.data.addLesson._id}`, title: `${newLesson.subject.name} / ${newLesson.promo}`, start: newLesson.start, end: newLesson.end }]) 
    })
    .catch(e => console.log(JSON.stringify(e)))
    handleClose()
  }

  const saveChange = (info: any) => {
      console.log(info.event)
    // updateLesson({ variables: { _id: user.getOne._id, data: newLesson } })
    // const fetchData = async () => {
    //   try {
    //     const result = await axios.put(`http://localhost:3000/api/lesson/${info.event.id}`, {
    //       start: info.event.startStr,
    //       end: info.event.endStr
    //     })
    //     const lessonsCopy = lessons.slice()
    //     lessonsCopy.filter(lesson => info.event.id === lesson.id)[0].start = info.event.startStr;
    //     lessonsCopy.filter(lesson => info.event.id === lesson.id)[0].end = info.event.endStr;
    //     setLessons(lessonsCopy)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // fetchData()
  }

  if (subjects) {
    return (
      <>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          events={lessons}
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          height='auto'
          locale='fr'
          hiddenDays={[0, 6]}
          slotDuration='00:30'
          slotMinTime='08:00'
          slotMaxTime='19:00'
          editable={true}
          selectable={true}
          select={function (info) {
            setNewLesson({ ...newLesson, start: info.startStr, end: info.endStr })
            handleShow()
          }}
          eventDrop={function (info) {
            saveChange(info)
          }}
          eventResize={function (info) {
            saveChange(info)
          }}
        />
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nouveau cours</DialogTitle>
          <DialogContent>

            <FormControl >
              <InputLabel id="demo-simple-select-label">Matière</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newLesson.subject._id}
                style={{ width: "500px" }}
                onChange={e => handleChangeSubject(e)}
              >
                {subjects.getAllSubjects.map((s: any) => <MenuItem value={s._id}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="promo">Promo</InputLabel>
            <Input id="promo" aria-describedby="my-helper-text" name="promo" onChange={e => handleChange(e)} />
          </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleSubmit} color="primary">
              Valider
          </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  } else {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>Loading...</div>
  }

}

export default Calendar
