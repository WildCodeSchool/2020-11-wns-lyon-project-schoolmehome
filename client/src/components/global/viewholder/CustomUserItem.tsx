import React, {ReactElement} from "react";
import {User} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import {Avatar, GridListTile, GridListTileBar, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import DefaultPicture from "../../../../src/image/profil.png"
import DefaultBackground from "../../../../src/image/background-user.jpg"
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './CustomUserItem.css'



export interface CustomUserItemProps {
    user: User
    removeHandler: (user: User) => void
}

const CustomUserItem = ({user, removeHandler}: CustomUserItemProps): ReactElement => {

    return (
        <GridListTile className="userContainer">
            <img className="avatar" alt="Remy Sharp" src={DefaultBackground} />
            <GridListTileBar
                className="tileBar"
                title={`${user.firstName}  ${user.lastName}`}
                subtitle={<span>{user.role}</span>}
                actionIcon={
                    <IconButton  aria-label={`delete ${user.firstName}`} onClick={() => removeHandler(user)}>
                        <DeleteIcon className="iconDeleteButton"/>
                    </IconButton>
                }
            />
        </GridListTile>
    )
}
export default CustomUserItem