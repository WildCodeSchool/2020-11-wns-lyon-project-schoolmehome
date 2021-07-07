import React, { useState, useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';


const Visio = () => {

  const [source, setSource] = useState("");
  const vidRef = useRef(null);

  const handleClick = () => {
    // navigator.mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true
    // }, function (stream) {
    //   // maVideo.src = URL.createObjectURL(stream);
    //   // pc.addStream(stream);
    //   setSource(window.URL.createObjectURL(stream))
    //   vidRef.current.play();
    //   console.log(window.URL.createObjectURL(stream))
    // }, function (err) {
    //   console.log(err)
    // })

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
      .then(function (stream) {
        console.log(vidRef, stream)
        vidRef.current.srcObject = stream;
        vidRef.current.play();
        const p = new SimplePeer({
          initiator: true,
          stream: stream
        })

        p.on('signal', data => {
          console.log(data)
        })
      })
      .catch(function (err) {
        console.error(err)
      });
  }

  return (
    <div>
      <button onClick={() => handleClick()}>
        lancer l'appel
    </button>
      <video ref={vidRef}>
        <source type="video/mp4" />
      </video>
      {/* <video ref="vidRef" width="400" height="400" src={source}></video> */}
    </div>

  )
}

export default Visio
