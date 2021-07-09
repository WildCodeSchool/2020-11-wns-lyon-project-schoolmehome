import React, {ReactElement} from "react";
import {UserType} from "../../dashboard/dashboard-admin/DashboardAdmin";
import UserForm from "./AddStudentForm";
import AddStudentForm from "./AddStudentForm";


export interface AddUserFormProps {
    userType: UserType
}


const AddUserForm = (): ReactElement => {
    return <UserForm />
}

export default AddUserForm