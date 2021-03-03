import React from 'react'
import './SlideCreation.css'

const Slide = ({ slide, index, changeSlide }: any) => {
  return (
    <div className={`slide ${slide.isActive ? 'slide-active' : ''}`} dangerouslySetInnerHTML={{ __html: `${slide.content}` }} onClick={() => changeSlide(index)}  />
  )
}

export default Slide


