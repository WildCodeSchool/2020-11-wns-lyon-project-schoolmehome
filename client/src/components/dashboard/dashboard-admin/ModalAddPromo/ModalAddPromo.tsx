import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import React from "react";
import { ReactElement } from "react";
import CustomDialog from "../../../global/CustomDialog";
import DefaultBackground from "../../../../../src/image/background-user.jpg"
import AddStudentPromoForm from "../../../global/form/AddStudentPromoForm";





const ModalAddPromo = (): ReactElement => {

    const DIALOG_TITLE = "Ajoutez des étudiants à une promotion"
    const DIALOG_CONTENT = "Remplissez le formulaire ci-dessous afin d'ajouter des étudiants à une promotion'"
    const DIALOG_POSITIVE = "Valider"
    const DIALOG_NEGATIVE = "Annuler"

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
        console.log("OK")
        handleClose();
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
                <AddStudentPromoForm />
            </CustomDialog>
        </Paper>
    )
}

export default ModalAddPromo