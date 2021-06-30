import { gql, useMutation } from "@apollo/client";
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
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={wiki._id}
                id={wiki._id}
                >
                <Typography>{wiki.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: wiki.lastVersion.content}} />
                        <button onClick={() => validate()}>Valider la version</button>
                    </div>
                </AccordionDetails>
            </Accordion> 
        </div>
    )
}