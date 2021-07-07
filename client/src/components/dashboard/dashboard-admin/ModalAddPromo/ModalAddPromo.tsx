import {Grid} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import React from "react";
import {ReactElement} from "react";
import CustomDialog from "../../../global/CustomDialog";
import DefaultBackground from "../../../../../src/image/background-user.jpg"
import AddStudentPromoForm from "../../../global/form/AddStudentPromoForm";
import {Subject} from "../ModalAddSubject/ModalAddSubject";
import {User} from "../ModalAddNewUser/ModalAddNewUser";


const ModalAddPromo = (): ReactElement => {

    const DIALOG_TITLE = "Ajoutez des étudiants à une promotion"
    const DIALOG_CONTENT = "Remplissez le formulaire ci-dessous afin d'ajouter des étudiants à une promotion'"
    const DIALOG_POSITIVE = "Valider"
    const DIALOG_NEGATIVE = "Annuler"

    const promo = new Promo([], [], "")


    const [open, setOpen] = React.useState(false);

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

    const handlePositiveAction = (): void => {
        console.log(promo)
        handleClose();
    }

    const getPromoName = (name: string) => {
        promo.name = name
    }

    const getUsers = (user: User[]) => {
        console.log("User: ", user)
        promo.users = user
    }

    const getSubjects = (subjects: Subject[]) => {
        console.log("Subject: ", subjects)
        promo.subjects = subjects
    }

    return (
        <Paper className="margin-default padding-default text-center">
            <Grid item xs={12} onClick={handleClickOpen}>
                <img className="width-max" src={DefaultBackground} alt="Default Picture"/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleClickOpen}>Promotion</Button>
            </Grid>
            <CustomDialog open={open}
                          handleClose={handleClose}
                          handlePositiveAction={handlePositiveAction}
                          dialogTitle={DIALOG_TITLE}
                          dialogContent={DIALOG_CONTENT}
                          positiveButton={DIALOG_POSITIVE}
                          negativeButton={DIALOG_NEGATIVE}>
                <AddStudentPromoForm getUsers={getUsers} getPromoName={getPromoName} getSubject={getSubjects}/>
            </CustomDialog>
        </Paper>
    )
}

export default ModalAddPromo


export class Promo {
    subjects: Subject[]
    users: User[]
    name: string

    constructor(subjects: Subject[], users: User[], name: string) {
        this.subjects = subjects
        this.users = users
        this.name = name
    }
}