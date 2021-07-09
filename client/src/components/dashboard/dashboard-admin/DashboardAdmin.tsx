import React, {createContext, Dispatch, ReactElement, SetStateAction} from "react";
import ModalAddNewUser, {UserFormData} from "./ModalAddNewUser/ModalAddNewUser";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./DashboardAdmin.css"
import ListAllUser from "./ListAllUser";

export const UserFormContext = createContext<any>({})

export enum UserType {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    CAMPUS_MANAGER = "ADMIN",
}

export const DashboardAdmin = (): ReactElement => {

    //TODO: Create Custom Hook | export function
    const formState = React.useState(new UserFormData("", "", "", "", "", [], [], []));

    return (
        <UserFormContext.Provider value={formState}>
            <Container maxWidth="xl" className="item-height">
                <ListAllUser/>
            </Container>
        </UserFormContext.Provider>
        // <UserFormContext.Provider value={formState}>
        //     <Container maxWidth="xl" className="item-height">
        //         <Grid container justify="center" alignItems="center"  className="item-height" spacing={8}>
        //             <Grid item xs={12} sm={4}>
        //                 <ModalAddNewUser userType={UserType.STUDENT}/>
        //             </Grid>
        //             <Grid item xs={12} sm={4}>
        //                 <ModalAddNewUser userType={UserType.TEACHER}/>
        //             </Grid>
        //             <Grid item xs={12} sm={4}>
        //                 <ModalAddNewUser userType={UserType.CAMPUS_MANAGER}/>
        //             </Grid>
        //         </Grid>
        //     </Container>
        // </UserFormContext.Provider>
    )
}