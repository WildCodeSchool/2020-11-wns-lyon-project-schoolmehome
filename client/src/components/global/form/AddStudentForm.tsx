import React, {ReactElement, useContext} from "react";
import {TextField} from "@material-ui/core";
import {UserFormContext} from "../../dashboard/dashboard-admin/DashboardAdmin";
import {UserFormData} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";


const UserForm = (): ReactElement => {

    const [studentData, setStudentData] = useContext(UserFormContext)
    // console.log(studentData instanceof UserFormData)
    const updateStudentData = (key: String, value: String) => {
        switch (key) {
            case "FirstName" :
                studentData.firstName = value
                break;
            case "LastName" :
                studentData.lastName = value
                break;
            case "Email" :
                studentData.email = value
                break;
            case "Password" :
                studentData.password = value
                break;
        }
        // console.log(studentData instanceof UserFormData)
        setStudentData(studentData)
    }

    return (
        <div className="inputText">
            <TextField label="FirstName"
                       autoFocus
                       id="standard-basic"
                       margin="dense"
                       fullWidth
                       required
                       onChange={e => updateStudentData("FirstName", e.target.value)}
                       className="inputText"/>
            <TextField label="LastName"
                       margin="dense"
                       fullWidth
                       id="standard-basic"
                       required
                       onChange={e => updateStudentData("LastName", e.target.value)}
                       className="inputText"/>
            <TextField label="Email"
                       margin="dense"
                       fullWidth
                       id="standard-basic"
                       required
                       onChange={e => updateStudentData("Email", e.target.value)}
                       className="inputText"/>
            <TextField label="Password"
                       margin="dense"
                       fullWidth
                       id="standard-basic"
                       required
                       onChange={e => updateStudentData("Password", e.target.value)}
                       className="inputText"/>
        </div>

    )
}

export default UserForm