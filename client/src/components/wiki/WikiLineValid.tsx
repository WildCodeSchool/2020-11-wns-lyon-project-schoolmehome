import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from "react"
import { useAuth } from "../../context/authContext";
import { ALL } from "./WikiValidate";

export const WikiLineValid = ({wiki} : any) => {

    const {user} = useAuth();

    const VALID = gql`
    mutation validArticle($valid : Boolean!, $id : String!, $validator : String!) {
        validArticle(valid: $valid, id: $id, validator: $validator) {
          _id
          lastVersion {
            isValid
          }
        }
      }
    `;

    const [validArticle] = useMutation<any>(VALID)

    const validate = () => {
        validArticle({ variables: {valid : true, id : wiki._id, validator : user.id}, refetchQueries: [{query : ALL}] })
            .then((data) => {
                console.log(data)
            }).catch((e) => {
                console.log(e)
        })
    }

    return(
        <div style={{marginBottom: '1em'}}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={wiki._id}
                id={wiki._id}
                className='titreWiki'
                >
                <Typography>{wiki.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: wiki.lastVersion.content}} />
                        <div className='center'>
                            <Button className='validButton' variant="contained" onClick={() => validate()}>Valider la version</Button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion> 
        </div>
    )
}