import React, {ReactElement} from "react";
import {User} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import DefaultPicture from "../../../../src/image/profil.png"

export interface CustomUserItemProps {
    user: User
}

const CustomUserItem = ({user}: CustomUserItemProps): ReactElement => {

    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={DefaultPicture} />
            </ListItemAvatar>
            <ListItemText
                primary = {user.firstName + " " + user.lastName}
                secondary={
                    <React.Fragment>
                        <Typography component="span"  color="textPrimary">
                            {user.email}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}
export default CustomUserItem