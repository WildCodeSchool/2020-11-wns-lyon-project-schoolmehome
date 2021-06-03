import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/authContext';
import useLesson from '../../hooks/useLesson';
import moment from 'moment';
import Button from '../global/button/Button';
import Carousel from 're-carousel'

const Visio = () => {

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { lesson } = useLesson(id);
  const [lessonToggle, setLessonToggle] = useState(false);


  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi] = useState({});

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: lesson ? lesson.findOneLesson.subject.name : '',
      userInfo: {
        displayName: (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : ''
      }
    });

    setJitsi(_jitsi)
  };

  useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, []);

  // <div dangerouslySetInnerHTML={{ __html: `${slide.content}` }}/>

  return (
    <div>
      {lesson && <h2>{lesson.findOneLesson.subject.name} {lesson.findOneLesson.promo} de {moment(lesson.findOneLesson.start).format('HH:mm')} à {moment(lesson.findOneLesson.end).format('HH:mm')}</h2>}
      <div style={{ display: "flex" }}>
        <div id={jitsiContainerId} style={{ height: 750, width: "100%", flex: "1" }} />
        {lessonToggle &&
          <div style={{ flex: "1", paddingLeft: "15px" }}>
            {(lesson && lesson.findOneLesson.presentation.length > 0) ? <Carousel>
              {lesson.findOneLesson.presentation[0].slides.map(s => {
                return (
                  <div key={s._id} dangerouslySetInnerHTML={{ __html: `${s.htmlContent}` }} style={{ height: '100%' }}></div>
                )
              })}
            </Carousel> : <p>Pas de présentation pour ce cours</p>}
          </div>}
      </div>
      <div style={{ display: "flex", alignItems:"center", justifyContent: "center", marginTop: "20px" }}>
      <Button onClick={() => setLessonToggle(!lessonToggle)} >{lessonToggle ? "Masquer le cours" :"Afficher le cours"}</Button>
      </div>
    </div>
  )

}

export default Visio
