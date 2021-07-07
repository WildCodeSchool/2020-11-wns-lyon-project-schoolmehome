import { gql } from "@apollo/client";
import { TextField } from "@material-ui/core";
import React, { ReactElement } from "react";

interface ModalAddSubject {
    handler: (name: string) => void
}

const AddSubjectForm = ({handler}: ModalAddSubject): ReactElement => {
    return (
        <div className="inputText">
            <TextField label="Nom du sujet"
                       autoFocus
                       id="standard-basic"
                       margin="dense"
                       fullWidth
                       required
                       onChange={e => handler(e.target.value)}
                       className="inputText"/>
        </div>
    )
}

export default AddSubjectForm