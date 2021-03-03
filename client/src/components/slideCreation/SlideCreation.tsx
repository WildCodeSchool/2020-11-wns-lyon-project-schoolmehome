import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import Slide from './Slide';
import { SlideInterface } from './interfaces';
import './SlideCreation.css'
import Button from '../global/button/Button'

const SlideCreation = () => {

  const [ActiveContent, setActiveContent] = useState<string[]>([])
  const [slideList, setSlideList] = useState<SlideInterface[]>([{ content: [], isActive: true }])

  useEffect(() => {

  }, [])

  const addBloc = () => {
    setActiveContent([...ActiveContent, '<div>test</div>'])
    console.log(ActiveContent)
  }

  const addSlide = () => {
    const slideListCopy = slideList.slice()
    slideListCopy.filter(slide => slide.isActive)[0].isActive = false;
    setActiveContent([])
    setSlideList([...slideList, { content: [], isActive: true }])
  }

  const changeSlide = (index: number) => {
    const slideListCopy = slideList.slice()
    slideListCopy.forEach(slide => slide.isActive = false)
    slideListCopy.filter((slide, i) => i === index)[0].isActive = true;
    setSlideList(slideListCopy)
    setActiveContent(slideListCopy.find((slide, i) => i === index)!.content)
  }

  return (
    <div className="slideCreation-container">
      <div className="editor-container">
        {
          ActiveContent.map( content => 
          {return (
          <Editor
            initialValue=""
            value={content}
            init={{
              inline: true,
              height: 800,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
            }}
            // onEditorChange={content => {
            //   const slideListCopy = slideList.slice()
            //   slideListCopy.filter(slide => slide.isActive)[0].content = content;
            //   setSlideList(slideListCopy)
            //   setActiveContent(content)
            // }}
          />)}
          )
        }
        
        <button type="button" onClick={addBloc}>ADD BLOC</button>
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