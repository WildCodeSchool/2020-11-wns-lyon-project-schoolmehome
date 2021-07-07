import React, { ReactElement, useState, useEffect } from 'react';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../global/button/Button';
import useUser from '../../hooks/useUser';
import usePresentations from '../../hooks/usePresentations';
import { Input, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import LessonType from '../../types/lessonType';
import { gql, useMutation } from '@apollo/client';
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
  const [actualLesson, setActualLesson] = useState<LessonType>({
    _id: '',
    start: '',
    end: '',
    subject: { name: '', _id: '' },
    promo: ''
  })
  const [show, setShow] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const { subjects } = useSubjects();
  const { presentations } = usePresentations();
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
          end: d.end,
          promo: d.promo,
          subject: d.subject,
          presentation: d.presentation ? d.presentation._id : null
        })
      }))
    }
  }, [user])

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  const handleChange = (e: any) => {
    setNewLesson({ ...newLesson, [e.target.name]: e.target.value })
  }
  const handleChangeSubject = (e: any) => {
    setNewLesson({ ...newLesson, subject: { _id: e.target.value, name: subjects.getAllSubjects.find((s: any) => s._id == e.target.value)?.name } })
  }
  const handleSubmit = () => {
    createLesson({ variables: { _id: user.getOne._id, data: newLesson } })
      .then((d: any) => {
        setLessons([
          ...lessons,
          {
            id: `${d.data.addLesson._id}`,
            title: `${newLesson.subject.name} / ${newLesson.promo}`,
            start: newLesson.start,
            end: newLesson.end,
            promo: newLesson.promo,
            subject: { name: newLesson.subject.name, _id: newLesson.subject._id }
          }])
      })
      .catch(e => console.log(JSON.stringify(e)))
    handleClose()
  }

  const handleSubmitUpdate = () => {
    updateLesson({ variables: { _id: actualLesson._id, data: { ...actualLesson, presentation: { _id: actualLesson.presentation } } } })
      .then((d: any) => {
        const lessonsCopy = lessons.slice();
        lessonsCopy.filter(l => l.id === actualLesson._id)[0].title = `${actualLesson.subject.name} / ${actualLesson.promo}`
        lessonsCopy.filter(l => l.id === actualLesson._id)[0].presentation = actualLesson.presentation;
        lessonsCopy.filter(l => l.id === actualLesson._id)[0].promo = actualLesson.promo;
        lessonsCopy.filter(l => l.id === actualLesson._id)[0].subject = actualLesson.subject;
        setLessons(lessonsCopy)
        setShowUpdate(false)
      })
      .catch(e => console.log(JSON.stringify(e)))

  }

  const saveChange = (info: any) => {
    const data = {
      start: info.event.startStr,
      end: info.event.endStr,
    }
    const lessonsCopy = lessons.slice();
    lessonsCopy.filter(l => l.id === info.event.id)[0].start = data.start;
    lessonsCopy.filter(l => l.id === info.event.id)[0].end = data.end;
    setLessons(lessonsCopy)
    updateLesson({ variables: { _id: info.event.id, data } })
      .catch(e => console.log(JSON.stringify(e)))
  }

  if (subjects && presentations) {
    return (
      <>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          events={lessons}
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
          eventClick={function (info) {
            setShowUpdate(true)
            const less = lessons.find((l: any) => l.id == info.event.id);
            setActualLesson({
              _id: info.event.id,
              start: info.event.startStr,
              end: info.event.endStr,
              promo: less.promo,
              subject: { name: less.subject.name, _id: less.subject._id },
              presentation: less.presentation
            })
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
              <Input id="promo" aria-describedby="my-helper-text" style={{ width: "500px" }} name="promo" onChange={e => handleChange(e)} />
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fermer
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showUpdate} onClose={() => setShowUpdate(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-up">Modifier cours</DialogTitle>
          <DialogContent>
            <FormControl >
              <InputLabel id="subject-up-label">Matière</InputLabel>
              <Select
                labelId="subject-up-label"
                id="subject-up"
                value={actualLesson.subject._id}
                style={{ width: "500px" }}
                onChange={(e: any) => setActualLesson({ ...actualLesson, subject: { _id: e.target.value, name: subjects.getAllSubjects.find((s: any) => s._id == e.target.value)?.name } })}
              >
                {subjects.getAllSubjects.map((s: any) => <MenuItem value={s._id}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="promo-up">Promo</InputLabel>
              <Input id="promo-up" aria-describedby="my-helper-text" value={actualLesson.promo} style={{ width: "500px" }} name="promo" onChange={e => setActualLesson({ ...actualLesson, [e.target.name]: e.target.value })} />
            </FormControl>
            <FormControl >
              <InputLabel id="pres-label">Présentation</InputLabel>
              <Select
                labelId="pres-label"
                id="presentation-up"
                value={actualLesson.presentation ? actualLesson.presentation : ""}
                style={{ width: "500px" }}
                onChange={(e: any) => setActualLesson({ ...actualLesson, presentation: e.target.value })}
              >
                <MenuItem value=""> </MenuItem>
                {presentations.findAllPresentation.map((s: any) => <MenuItem value={s._id}>{s.title}</MenuItem>)}
              </Select>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowUpdate(false)} color="primary">
              Fermer
            </Button>
            <Button onClick={handleSubmitUpdate} color="primary">
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
