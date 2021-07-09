import {Button, Grid, Paper} from "@material-ui/core"
import React, {ReactElement} from "react"
import CustomDialog from "../../../global/CustomDialog"
import DefaultBackground from "../../../../../src/image/background-user.jpg"
import AddSubjectForm from "../../../global/form/AddSubjectForm"
import {gql, useMutation} from "@apollo/client"


const ModalAddSubject = (): ReactElement => {

    const DIALOG_TITLE = "Ajoutez un sujet"
    const DIALOG_CONTENT = "Remplissez le formulaire ci-dessous pour ajouter un sujet"
    const DIALOG_POSITIVE = "Valider"
    const DIALOG_NEGATIVE = "Annuler"

    const [open, setOpen] = React.useState(false);
    const [subjectName, setSubject] = React.useState("");


    const CREATE_SUBJECT = gql`
        mutation create($subject: SubjectInput!) {
            createSubject(subject: $subject) {
                name
            }
        }
    `;

    const [createSubject] = useMutation<any>(CREATE_SUBJECT)

    const handleClickOpen = () => {
        console.log("Open" + open)
        setOpen(true);
        console.log("Open" + open)
    };

    const handleClose = () => {
        console.log("Close" + open)
        setOpen(false);
        console.log("Close" + open)
    };

    const formNameHandler = (name: string) => {
        setSubject(name)
    };


    const handlePositiveAction = (): void => {
        console.log(subjectName)
        const subject = new SubjectInput(subjectName)
        createSubject({variables: {subject: subject}})
            .then((data: any) => {
                console.log(data)
            })
        handleClose();
    }

    return (
        <Paper className="margin-default padding-default text-center">
            <Grid item xs={12} onClick={handleClickOpen}>
                <img className="width-max" src={DefaultBackground} alt="Default Picture"/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleClickOpen}>Sujet</Button>
            </Grid>
            <CustomDialog open={open}
                          handleClose={handleClose}
                          handlePositiveAction={handlePositiveAction}
                          dialogTitle={DIALOG_TITLE}
                          dialogContent={DIALOG_CONTENT}
                          positiveButton={DIALOG_POSITIVE}
                          negativeButton={DIALOG_NEGATIVE}>
                <AddSubjectForm handler={formNameHandler}/>
            </CustomDialog>
        </Paper>
    )
}

export default ModalAddSubject



export class SubjectInput {
    public _id: string
    public name: string

    constructor(name: string) {
        this.name = name
    }

}

