import EditorJs from "react-editor-js";
import React from 'react'
import './SlideCreation.css'
import { EDITOR_JS_TOOLS } from "./tools";


const Slide = ({ slide, index, changeSlide }: any) => {
  const editor = new EditorJs({
    tools: EDITOR_JS_TOOLS,
    holderId: 'editorjs',
    data: {
      "time" : 1550476186479,
      "blocks" : [
          {
              "type" : "paragraph",
              "data" : {
                  "text" : "The example of text that was written in <b>one of popular</b> text editors."
              }
          },
          {
              "type" : "header",
              "data" : {
                  "text" : "With the header of course",
                  "level" : 2
              }
          },
          {
              "type" : "paragraph",
              "data" : {
                  "text" : "So what do we have?"
              }
          }
      ],
      "version" : "2.8.1"
  }
  })
  return (
    <div className={`slide ${slide.isActive ? 'slide-active' : ''}`} onClick={() => changeSlide(index)} >
      <div id='editorjs'></div>
    </div>
  )
}

export default Slide
