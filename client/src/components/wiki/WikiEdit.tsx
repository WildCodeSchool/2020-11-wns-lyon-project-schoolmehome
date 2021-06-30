import { gql, useMutation, useQuery } from "@apollo/client";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from "../global/button/Button";

export const WikiEdit = () => {
    let { id }: { id: string } = useParams();
    const {user} = useAuth();
    const history = useHistory();

    const GET_ARTICLE = gql`
        query getArticle($id: String!) {
        getArticlesByIdWithAll(_id: $id) {
            _id
            title
            author
            content {
                version
                isValid
                validatorTeacher
                content
                author 
            }
            createdAt
            promo 
        }}
    `;

    const { loading, error, data } = useQuery(GET_ARTICLE, {variables : {id}, fetchPolicy: 'network-only'});
    const [article, setarticle] = useState<any>()
    const [ActiveContent, setActiveContent] = useState<string>('')

    const EDITING = gql`
        mutation makeArticleEditing ($id: String!, $value : Boolean!) {
          makeArticleEditing(_id : $id, value : $value){
                _id
            }
        }
    `;
    const [makeArticleEditing] = useMutation<any>(EDITING)
    

    useEffect(() => {
      const idI = setInterval(async () => {
        await makeArticleEditing({variables : {id : id, value : true}})
        console.log('ok')
      }, 5000)
      return (() => {
        clearInterval(idI)
      })
    }, [])

    useEffect(() => {
        if (data) {
            if (data.getArticlesByIdWithAll) {
                console.log(data.getArticlesByIdWithAll)
                setarticle(data.getArticlesByIdWithAll)
                setActiveContent(data.getArticlesByIdWithAll.content[data.getArticlesByIdWithAll.content.length - 1].content)
            }
        }
    }, [data])

    const UPD_ART = gql`
        mutation editArticles ($art: ArticlesWikiInput!) {
          editArticles(data: $art){
                _id
            }
        }
    `;
    const [editArticles] = useMutation<any>(UPD_ART)

    const save = () => {
      let content = [...article.content];
      const d = content.map(c => ({
        ...c,
        __typename : undefined
      }))
      console.log(d)
      d.push({
          version : article.content.length + 1,
          createdAt : moment().toISOString(),
          isValid : 0,
          author : user.id,
          content : ActiveContent,
      }) 
      const editArt = {...article, isEditing : false, content : d, __typename : undefined};
      editArticles({ variables: { art: editArt} })
            .then((data) => {
                console.log(data)
                history.push(`/wiki/${data.data.editArticles._id}`)
            }).catch((e) => {
                console.log(e)
        })
    }

    
    return(
        <div>

          

          <div className="slideCreation-container">
      
          <div className="editor-container">
            <Editor
              initialValue=''
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
                setActiveContent(content)
              }}
            />
          </div>
      </div>
      <Button onClick={save}>Enregistrer</Button>
        </div>
    )
}