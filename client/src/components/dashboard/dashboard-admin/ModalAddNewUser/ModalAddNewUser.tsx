import React, {ReactElement, useContext} from "react";
import CustomDialog from "../../../global/CustomDialog";
import AddUserForm from "../../../global/form/AddUserForm";
import {UserFormContext, UserType} from "../DashboardAdmin";
import "./ModalAddNewUser.css"
import {Button, Grid, Paper} from "@material-ui/core";
import DefaultPicture from "../../../../../src/image/profil.png"
import DefaultBackground from "../../../../../src/image/background-user.jpg"
import {gql, useMutation} from "@apollo/client";



interface ModalAddNewUserProps {
    userType: UserType
}


const ModalAddNewUser = (): ReactElement => {

    const DIALOG_TITLE = "Ajoutez un.e nouvel.le utilisateur"
    const DIALOG_CONTENT = "Remplissez le formulaire ci-dessous afin de créer un.e nouvel.le utilisateur"
    const DIALOG_POSITIVE = "Ajouter"
    const DIALOG_NEGATIVE = "Annuler"

    const [open, setOpen] = React.useState(false);
    const [userForm] = useContext(UserFormContext)

    const NEW_USER = gql`
        mutation createUser ($user: UserInput!) {
            createUser(data: $user){
                _id
            }
        }
    `;
    const [signup] = useMutation<any>(NEW_USER)

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
        // addNewUser(userForm, userType);
        handleClose();
    }

    const addNewUser = (userFormData: UserFormData, userType: UserType): void => {
        switch (userType) {
            case "STUDENT":
                userFormData.role = "User"
                break
            case "TEACHER":
                userFormData.role = "Teacher"
                break
            case "ADMIN":
                userFormData.role = 'Admin'
        }
        const user = new User(userFormData.firstName, userFormData.lastName, userFormData.email, userFormData.password, userFormData.role, userFormData._lesson)
        signup({ variables: { user: user} })
            .then((data) => {
                console.log(data.data._id)
            }).catch((e) => {
                console.log(e)
        })
    }

    return (
        <Paper className="margin-default padding-default text-center">
            <Grid item xs={12} onClick={handleClickOpen}>
                <img className="width-max" src={DefaultBackground} alt="Default Picture"/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleClickOpen}>Utilisateur</Button>
            </Grid>
            <CustomDialog open={open}
                          handleClose={handleClose}
                          handlePositiveAction={handlePositiveAction}
                          dialogTitle={DIALOG_TITLE}
                          dialogContent={DIALOG_CONTENT}
                          positiveButton={DIALOG_POSITIVE}
                          negativeButton={DIALOG_NEGATIVE}>
                <AddUserForm />
            </CustomDialog>
        </Paper>
    )
}

export class User {
    _id: String
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    lessons: [] = []
    subject: [] = []
    promo: [] = []

    constructor(firstName: String, lastName: String, email: String, password: String, role: String, lessons: []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.lessons = lessons;
    }
}

export class UserFormData {
    _firstName: String
    _lastName: String
    _email: String
    _password: String
    _role: String
    _lesson: []
    _subject: []
    _promo: []


    get firstName(): String {
        console.log(this)
        return this._firstName;
    }

    get lastName(): String {
        return this._lastName;
    }

    get email(): String {
        return this._email;
    }

    get password(): String {
        return this._password;
    }

    get role(): String {
        return this._role;
    }

    set firstName(value: String) {
        this._firstName = value;
    }

    set lastName(value: String) {
        this._lastName = value;
    }

    set email(value: String) {
        this._email = value;
    }

    set password(value: String) {
        this._password = value;
    }

    set role(value: String) {
        this._role = value;
    }

    constructor(firstName: String, lastName: String, email: String, password: String, userRole: String, lesson: [], promo: [], subject: []) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._role = userRole;
        this._lesson = lesson;
        this._promo = promo;
        this._subject = promo;
    }
}

export default ModalAddNewUser