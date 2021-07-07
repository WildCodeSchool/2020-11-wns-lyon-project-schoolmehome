import React, {ReactElement} from "react";
import {UserType} from "../../dashboard/dashboard-admin/DashboardAdmin";
import AddStudentForm from "./AddStudentForm";


export interface AddUserFormProps {
    userType: UserType
}

const showAddStudentForm = (): ReactElement => {
    return <AddStudentForm />
}

const showAddTeacherForm = (): void => {

}

const showAddAdminForm = (): void => {

}

const AddUserForm = ({userType}: AddUserFormProps): ReactElement => {

    switch (userType) {
        case UserType.STUDENT:
            return showAddStudentForm()
        // case UserType.TEACHER:
        //     showAddTeacherForm()
        //     break
        // case UserType.ADMIN:
        //     showAddAdminForm()
        //     break
        default:
            return <></>
    }
}

export default AddUserForm