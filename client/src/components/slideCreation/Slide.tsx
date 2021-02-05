import React, { useEffect } from 'react'
import './SlideCreation.css'

const Slide = ({ handleDelete, slide, index, changeSlide }: any) => {

  return (
    <div className={`slide ${slide.isActive ? 'slide-active' : ''}`} onClick={() => changeSlide(index)}>
      <button onClick={(e) => handleDelete(e, index)} className="delete-slide-button">X</button>
      <div dangerouslySetInnerHTML={{ __html: `${slide.content}` }}/>
    </div>
  )
}

export default Slide
