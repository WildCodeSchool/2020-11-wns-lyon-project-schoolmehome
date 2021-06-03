import React, {ReactChild, ReactElement} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import {TransitionProps} from "@material-ui/core/transitions";
import {TextField} from "@material-ui/core";
import "./CustomDialog.css";


interface CustomDialogProps {
    open: boolean,
    handleClose: () => void,
    handlePositiveAction: () => void,
    dialogTitle: String,
    dialogContent: String
    positiveButton?: String,
    negativeButton?: String,
    children: ReactChild
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CustomDialog = (customDialogProps: CustomDialogProps): ReactElement => {

    const close = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, isPositive: boolean) => {
        event.preventDefault()
        isPositive ? customDialogProps.handlePositiveAction() : customDialogProps.handleClose()
    }
    return (

        <Dialog open={customDialogProps.open} onClose={customDialogProps.handleClose}
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">{customDialogProps.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {customDialogProps.dialogContent}
                </DialogContentText>
                {customDialogProps.children}
            </DialogContent>
            <DialogActions>
                {customDialogProps.negativeButton ? <Button onClick={event => {
                    close(event, false)
                }} color="primary">
                    {customDialogProps.negativeButton}
                </Button> : <></>}
                {customDialogProps.positiveButton ? <Button onClick={event => {
                    close(event, true)
                }} color="primary">
                    {customDialogProps.positiveButton}
                </Button> : <></>}
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog