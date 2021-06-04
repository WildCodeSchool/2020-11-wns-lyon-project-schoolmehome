import { gql, useMutation } from "@apollo/client";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import React, { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from "../global/button/Button";
import Input from "../global/input/Input";

export const WikiNew = () => {
    const [content, setContent] = useState('');
    const [title, setTitle]  = useState('');
    const {user} = useAuth();
    const history = useHistory();

    const NEW_ART = gql`
        mutation createArticle ($art: ArticlesWikiInput!) {
            createArticles(data: $art){
                _id
            }
        }
    `;
    const [createArticle] = useMutation<any>(NEW_ART)

    const save = () => {
        const newA = {
            isEditing : false,
            title : title,
            promo : "5fb66c6114be1635346ac44d", // FIX ME attention promo en dur
            createdAt : moment().toISOString(),
            author : user.id,
            content : [{
                version : 1,
                createdAt : moment().toISOString(),
                isValid : 0,
                author : user.id,
                content : content,
            }]
        }
        console.log(newA);
        createArticle({ variables: { art: newA} })
            .then((data) => {
                console.log(data)
                history.push(`/wiki/${data.data.createArticles._id}`)
            }).catch((e) => {
                console.log(e)
        })
    }


    return(
        <div>
        <div>
        <Input type="text" placeholder="Titre du Wiki" onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)} />
        <Button onClick={save}>Enregistrer</Button>
      </div>
      <div className="slideCreation-container">
      
        <div className="editor-container">
          <Editor
            initialValue=""
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
              setContent(content);
            }}
          />
        </div>
        </div>
        </div>
    )
}