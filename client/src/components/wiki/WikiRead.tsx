import { gql, useApolloClient, useQuery } from "@apollo/client";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import Button from "../global/button/Button";

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
            content {
                version
                author {
                    firstName
                    lastName
                }
                createdAt
                validatorTeacher {
                    firstName
                    lastName
                }
            }
        }}
    `;

    const { loading, error, data } = useQuery(GET_ARTICLE, {variables : {id}, fetchPolicy: 'network-only'});
    const [article, setarticle] = useState<any>()

    useEffect(() => {
        if (data) {
            if (data.getArticlesById) {
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
            console.log(result.data)
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

  const [openMod, setOpenMod] = useState(false);

  const handleClickMod = () => {
    setOpenMod(true);
  };

  const handleCloseMod = (event?: React.SyntheticEvent, reason?: string) => {
    setOpenMod(false);
  };

    if(article){
        return(
            <div className="wikiread">
                <h3 className='wikititle'>{article.title}</h3>
                <div style={{display : 'flex', justifyContent : 'space-between'}}>
                    <p className="created">Créé par {article.author.firstName} {article.author.lastName} / Promotion : {article.promo.name}{
                        article.lastVersion.validatorTeacher ? ' / ✔️ Version validée' :''
                    }</p>
                    <button className='unstyled created' onClick={() => handleClickMod()}>Voir les contributeurs</button>
                </div>
                <div dangerouslySetInnerHTML={{__html: article.lastVersion.content}} />
                <div className='center'>
                    <Button onClick={() => Edit()}>Editer</Button>
                </div>
                
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Wiki en cours d'édition !
                    </Alert>
                </Snackbar>
                <Dialog
                    open={openMod}
                    onClose={handleCloseMod}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Liste des contributions</DialogTitle>
                    <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        {article.content
                        .map(
                            (c : any) =>{
                                return(
                                <div className='wiki-writer'>
                                <div><strong>{moment(c.createdAt).format("DD/MM/YYYY à HH:MM")}</strong> {c.version === 1 ? 'Création par' : 'Modifié par'} {c.author.firstName} {c.author.lastName}</div>
                                {
                                    c.validatorTeacher ?
                                        <div className='wikiVersion'>Version validée par {c.validatorTeacher.firstName} {c.validatorTeacher.lastName}</div>
                                        : ''
                                }
                                </div>
                            )} 
                        )}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCloseMod}>
                            Fermer
                        </button>
                    </DialogActions>
                </Dialog>
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
