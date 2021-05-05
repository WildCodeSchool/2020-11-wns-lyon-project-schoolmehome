import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';

const Visio = () => {

  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi] = useState({});
  const { id } = useParams();

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
      roomName: id,
    });

    setJitsi(_jitsi)
  };

  useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, []);

  return (
    <div>
      <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />
    </div>
  )
}

export default Visio
