import React, {ReactElement} from "react";
import {User} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import DefaultPicture from "../../../../src/image/profil.png"
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';



export interface CustomUserItemProps {
    user: User
    removeHandler: (user: User) => void
}

const CustomUserItem = ({user, removeHandler}: CustomUserItemProps): ReactElement => {

    return (
        <ListItem>
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
            <ListItemSecondaryAction onClick={() => removeHandler(user)}>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
export default CustomUserItem