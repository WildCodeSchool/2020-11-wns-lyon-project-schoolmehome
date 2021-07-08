import React, {ReactElement} from "react";
import {UserType} from "../../dashboard/dashboard-admin/DashboardAdmin";
import UserForm from "./AddStudentForm";
import AddStudentForm from "./AddStudentForm";


export interface AddUserFormProps {
    userType: UserType
}

const showUserForm = (): ReactElement => {
    return <UserForm />
}

const showAddTeacherForm = (): void => {

}

const showAddAdminForm = (): void => {

}

const AddUserForm = (): ReactElement => {
    return showUserForm()
}

export default AddUserForm