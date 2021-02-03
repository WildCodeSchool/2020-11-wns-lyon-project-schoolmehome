import React, { useRef, useState } from 'react'
import Slide from './Slide';
import { SlideInterface } from './interfaces';
import './SlideCreation.css'
import Button from '../global/button/Button'
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from './tools';

const SlideCreation = () => {

  const [ActiveContent, setActiveContent] = useState<any>({})
  const [slideList, setSlideList] = useState<SlideInterface[]>([{ content: {}, isActive: true }])

  const addSlide = () => {
    const slideListCopy = slideList.slice()
    slideListCopy.filter(slide => slide.isActive)[0].isActive = false;
    setActiveContent('')
    setSlideList([...slideList, { content: {}, isActive: true }])
  }

  const changeSlide = (index: number) => {
    const slideListCopy = slideList.slice()
    slideListCopy.forEach(slide => slide.isActive = false)
    slideListCopy.filter((slide, i) => i === index)[0].isActive = true;
    setSlideList(slideListCopy)
    setActiveContent(slideListCopy.find((slide, i) => i === index)!.content)
  }

  const instanceRef = useRef(null)

  async function handleChange() {
    const savedData = await instanceRef.current.save()
    console.log(JSON.stringify(savedData))
    const stringData = JSON.stringify(savedData);
    const slideListCopy = slideList.slice()
    slideListCopy.filter(slide => slide.isActive)[0].content = stringData;
    console.log(slideListCopy)
    setSlideList(slideListCopy)
    setActiveContent(savedData)
  }


  return (
    <div className="slideCreation-container">
      <div className="editor-container">
        <EditorJs data={ActiveContent} onChange={ () => handleChange()} 
        instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}/>
      </div>
      <div className="slideCreation-rigth-container">
        <div className="slides-container">
          <h2>Slide show</h2>
            {slideList.map((slide: SlideInterface, index) => {
              return (
                <Slide slide={slide} index={index} changeSlide={changeSlide} />
              )
            })}
        </div>
        <Button onClick={addSlide}>Ajouter</Button>
      </div>
    </div>
  )
}

export default SlideCreation
