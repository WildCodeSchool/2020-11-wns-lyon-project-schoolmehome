import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";

export const WikiRead = () => {

    let { id }: { id: string } = useParams();
    const apolloClient = useApolloClient();

    const GET_ARTICLE = gql`
        query getArticle($id: String!) {
        getArticlesById(_id: $id) {
            _id
            title
            author {
                firstName
                lastName
            }
            lastVersion {
                version
                isValid
                validatorTeacher {
                    firstName
                    lastName
                }
                content
                author {
                    firstName
                    lastName
                }
            }
            createdAt
            promo {
                _id
                name
            }
        }}
    `;

    const { loading, error, data } = useQuery(GET_ARTICLE, {variables : {id}, fetchPolicy: 'network-only'});
    const [article, setarticle] = useState<any>()

    useEffect(() => {
        if (data) {
            if (data.getArticlesById) {
                console.log(data.getArticlesById)
                setarticle(data.getArticlesById)
            }
        }
    }, [data])

    const history = useHistory();

    const IS_EDITING = gql`
        query isArticleEditing($id: String!) {
            isArticleEditing(_id: $id) 
        }
    `;

    const Edit = async () => {
        const result = await apolloClient.query({query : IS_EDITING, variables : {id}, fetchPolicy : 'network-only'})
        if(result.data){
            if(!result.data.isArticleEditing){
                history.push(`/wiki/edit/${article._id}`)
            } else {
                handleClick()
                console.log("déjà en train d'éditer")
            }
        }
        
    }

    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    if(article){
        return(
            <div className="wikiread">
                <h3 className='wikititle'>{article.title}</h3>
                <p className="created">Créé par {article.author.firstName} {article.author.lastName} / Promotion : {article.promo.name}</p>
                <div dangerouslySetInnerHTML={{__html: article.lastVersion.content}} />
                <button onClick={() => Edit()}>Editer</button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Wiki en cours d'édition !
                    </Alert>
                </Snackbar>
            </div>
        )
    } else {
        return(
            <div>Loading...</div>
        )
    }
    
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
