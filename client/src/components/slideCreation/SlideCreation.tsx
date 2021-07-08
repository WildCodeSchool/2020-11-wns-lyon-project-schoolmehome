import React, { FormEvent, useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import Slide from './Slide';
import { Presentation, SlideInterface } from './interfaces';
import './SlideCreation.css'
import Button from '../global/button/Button'
import Input from '../global/input/Input';
import { gql, useMutation } from '@apollo/client';
import Input2 from '../global/input2/Input';

const SlideCreation = () => {

  const [ActiveContent, setActiveContent] = useState<string>('')
  const [slideList, setSlideList] = useState<SlideInterface[]>([{ content: '', isActive: true }])
  const [titlePres, setTitlePres] = useState<string>('')

  useEffect(() => {
    const c = slideList.find(slide => slide.isActive)
    setActiveContent(c.content)
  }, [slideList])

  const addSlide = () => {
    const slideListCopy = slideList.slice()
    slideListCopy.filter(slide => slide.isActive)[0].isActive = false;
    // setActiveContent('')
    setSlideList([...slideList, { content: '', isActive: true }])
  }

  const changeSlide = (index: number) => {
    const slideListCopy = slideList.slice()
    slideListCopy.forEach(slide => slide.isActive = false)
    slideListCopy.filter((slide, i) => i === index)[0].isActive = true;
    setSlideList(slideListCopy)
    // setActiveContent(slideListCopy.find((slide, i) => i === index)!.content)
  }

  const handleDelete = (e: any, index: number) => {
    e.stopPropagation();
    if (slideList.length > 1) {
      let slideListCopy = slideList.slice()
      slideListCopy = slideListCopy.filter((slide, i) => i !== index)
      if (!slideListCopy.find(slide => slide.isActive)) {
        slideListCopy[slideListCopy.length - 1].isActive = true
      }
      setSlideList(slideListCopy)
      // setActiveContent(slideListCopy[slideListCopy.length - 1]!.content)
    }
  }

  const NEW_PRES = gql`
        mutation createPresentation ($pres: PresentationInput!) {
          createPresentation(data: $pres){
                _id
            }
        }
    `;
    const [createPresentation] = useMutation<any>(NEW_PRES)

  const save = () => {
    const pres : Presentation = {
      title : titlePres,
      slides : [],
    }
    Object.keys(slideList).map( k => {
        return pres.slides.push({
          order : +k,
          htmlContent : slideList[+k].content
        })
    })
    console.log(pres);
    createPresentation({ variables: { pres: pres} })
            .then((data) => {
                console.log(data)
            }).catch((e) => {
                console.log(e)
        })
    
  }

  return (
    <div>
      <div className="top-container">
        <Input2 type="text" placeholder="Titre de la présentation" onChange={(e: FormEvent<HTMLInputElement>) => setTitlePres(e.currentTarget.value)} />
        <Button onClick={save} style={{ fontSize: "1.25rem" }}>Enregistrer</Button>
      </div>
      <div className="slideCreation-container">
      
        <div className="editor-container">
          <Editor
            initialValue=""
            value={ActiveContent}
            init={{
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
            onEditorChange={content => {
              const slideListCopy = slideList.slice()
              slideListCopy.filter(slide => slide.isActive)[0].content = content;
              setSlideList(slideListCopy)
              setActiveContent(content)
            }}
          />
        </div>
        <div className="slideCreation-rigth-container">
          <div className="slides-container">
            <h2>Slide show</h2>
              {slideList.map((slide: SlideInterface, index) => {
                return (
                  <Slide slide={slide} index={index} changeSlide={changeSlide} handleDelete={handleDelete} />
                )
              })}
          </div>
          <Button onClick={addSlide}>Ajouter</Button>
        </div>
      </div>
    </div>
    
  )
}

export default SlideCreation
