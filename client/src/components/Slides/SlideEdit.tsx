import React, { FormEvent, useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import Slide from '../slideCreation/Slide';
import { Presentation, SlideInterface } from '../slideCreation/interfaces';
import '../slideCreation/SlideCreation.css'
import Button from '../global/button/Button'
import Input from '../global/input/Input';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';

const SlideCreation = () => {
    const history = useHistory();

    let { id }: { id: string } = useParams();

    const GET_PRES = gql`
        query getPresentation ($id: String!) {
            findOnePresentation(_id: $id){
                _id
                title
                slides {
                    title
                    htmlContent
                    order
                }
            }
        }
    `;
    const { loading, error, data } = useQuery<any>(GET_PRES, {variables: {id}, fetchPolicy : 'network-only'})
  const [ActiveContent, setActiveContent] = useState<string>('')
  const [slideList, setSlideList] = useState<SlideInterface[]>([{ content: '', isActive: true }])
  const [titlePres, setTitlePres] = useState<string>('')

  useEffect(() => {
    if(data){
        console.log(data.findOnePresentation)
        setTitlePres(data.findOnePresentation.title)
        let slides : any[] = [];
        data.findOnePresentation.slides.forEach( (s : any) => {
            slides.push({content : s.htmlContent, isActive : false, order : s.order })
        })
        if(slides[0]){
            slides[0].isActive = true;
        }
        setSlideList(slides);
        setActiveContent(slides[0].content)
    }
  }, [data])

  const addSlide = () => {
    const slideListCopy = slideList.slice()
    slideListCopy.filter(slide => slide.isActive)[0].isActive = false;
    setActiveContent('')
    setSlideList([...slideList, { content: '', isActive: true }])
  }

  const changeSlide = (index: number) => {
    const slideListCopy = slideList.slice()
    slideListCopy.forEach(slide => slide.isActive = false)
    slideListCopy.filter((slide, i) => i === index)[0].isActive = true;
    setSlideList(slideListCopy)
    setActiveContent(slideListCopy.find((slide, i) => i === index)!.content)
  }

  const handleDelete = (e: any, index: number) => {
    e.stopPropagation();
    console.log(index);
    if (slideList.length > 1) {
      let slideListCopy = slideList.slice()
      slideListCopy.splice(index, 1)
    
      if (!slideListCopy.find(slide => slide.isActive)) {
        slideListCopy[Math.max(0, index - 1)].isActive = true
      }
      console.log(JSON.stringify(slideListCopy, null, 4))
      setSlideList(slideListCopy)
      setTimeout(() => {
        setActiveContent(slideListCopy[Math.max(0, index - 1)]!.content)
      }, 0)
      console.log(Math.max(0, index - 1))
    }
  }

  const UPD_PRES = gql`
        mutation updatePresentation ($pres: PresentationInput!) {
          updatePresentation(data: $pres){
                title
            }
        }
    `;
    const [updatePresentation] = useMutation<any>(UPD_PRES)

  const save = () => {
    const pres : Presentation & {_id : string} = {
      _id : id,
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
      updatePresentation({ variables: { pres: pres} })
              .then((data) => {
                  console.log(data)
                  history.push(`/slides`);
              }).catch((e) => {
                  console.log(e)
          })
  }

  return (
    <div>
      <div>
        <Input type="text" value={titlePres} placeholder="Titre de la présentation" onChange={(e: FormEvent<HTMLInputElement>) => setTitlePres(e.currentTarget.value)} />
        <Button onClick={save}>Enregistrer les modifications</Button>
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
                  <Slide key={slide.order} slide={slide} index={index} changeSlide={changeSlide} handleDelete={handleDelete} />
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