import React, {ReactElement, useEffect, useState} from "react";
import {List, ListItem, Paper, GridList, Button, Grid} from "@material-ui/core";
import {empty, gql, useMutation, useQuery} from "@apollo/client";
import CustomUserItem from "../../global/viewholder/CustomUserItem";
import "./ListAllUser.css"
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ModalAddNewUser, {User} from "./ModalAddNewUser/ModalAddNewUser";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {stringify} from "querystring";
import {UserType} from "./DashboardAdmin";
import AddUserForm from "../../global/form/AddUserForm";
import CustomDialog from "../../global/CustomDialog";

const ListAllUser = (): ReactElement => {

    const SEARCH_USER = gql`
        query($name: String!) {
            search(name: $name) {
                _id
                lastName
                firstName
                email
                role
            }
        }
    `;

    const DELETE_USER = gql`
        mutation ($id: String!) {
            delete(id: $id){
                _id
                lastName
                firstName
                email
                role
            }
        }
    `;

    const DIALOG_TITLE = "Ajoutez un.e nouvel.le utilisateur"
    const DIALOG_CONTENT = "Sélectionner le type d'utilisateur"
    const DIALOG_NEGATIVE = "Annuler"


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePositiveAction = (): void => {
    }

    const [value, setName] = useState<String>("")
    const {loading, error, data} = useQuery(SEARCH_USER, {variables: {name: value}})
    const [search, setSearch] = useState<User[]>([])
    const [newDataAfterDelete] = useMutation<any>(DELETE_USER)


    useEffect(() => {
        if (data !== undefined) {
            console.log(JSON.parse(JSON.stringify(data.search)))
            setSearch(JSON.parse(JSON.stringify(data.search)))
        }
    }, [data])

    const loadDynamicQuery = (value: String) => {
        setName(value)
    }

    const [formats, setFormats] = React.useState(() => ["empty"]);

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
        if (data) {
            let tempData: User[] = JSON.parse(JSON.stringify(data.search))
            let formatFetchData: User[] = []
            newFormats.forEach((value, index) => {
                switch (value) {
                    case "student":
                        formatFetchData = formatFetchData.concat(data.search.filter((user: User) => {
                            console.log(user.role)
                            return user.role === "User" || user.role === "Student"
                        }))
                        console.log(formatFetchData)
                        break
                    case "teacher":
                        formatFetchData = formatFetchData.concat(data.search.filter((user: User) => {
                            return user.role === "Teacher"
                        }))
                        break
                    case "admin":
                        formatFetchData = formatFetchData.concat(data.search.filter((user: User) => {
                            return user.role === "Admin"
                        }))
                        break
                }
            })
            if (formatFetchData.length > 0) {
                tempData = formatFetchData
                console.log("woauh")
            }
            if (newFormats.includes("asc")) {
                tempData.sort((user: User, user2: User) => {
                    return user.firstName > user2.firstName ? 1 : -1
                })
            } else {
                tempData.sort((user: User, user2: User) => {
                    return user.firstName < user2.firstName ? 1 : -1
                })
            }
            setSearch(tempData)
        }
    };

    const openModalAddUser = () => {
        return (
            <Grid container justify="center" alignItems="center" className="item-height" spacing={4}>
                <Grid item xs={12} sm={4}>
                    <ModalAddNewUser userType={UserType.STUDENT}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ModalAddNewUser userType={UserType.TEACHER}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ModalAddNewUser userType={UserType.CAMPUS_MANAGER}/>
                </Grid>
            </Grid>
        )
    }

    const removeUser = (user: User) => {
        console.log(user)

        newDataAfterDelete({variables: {id: user._id}})
            .then((data: any) => {
                console.log(data)
            })


        const indexOfItem = search.indexOf(user)
        if (indexOfItem > -1) {
            search.splice(indexOfItem, 1)
        }
        console.log(JSON.stringify(search))
        setSearch(search.slice())
    }

    return (
        <div>
            <CustomDialog open={open}
                          handleClose={handleClose}
                          handlePositiveAction={handlePositiveAction}
                          dialogTitle={DIALOG_TITLE}
                          dialogContent={DIALOG_CONTENT}
                          negativeButton={DIALOG_NEGATIVE}>
                {openModalAddUser()}
            </CustomDialog>
            <Paper component="form">
                <InputBase
                    onChange={e => {
                        loadDynamicQuery(e.target.value)
                    }}
                    placeholder="Rechercher un utilisateur"
                    inputProps={{'aria-label': 'Search User'}}
                    className="search-bar"
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <ToggleButtonGroup className="filterBtn" value={formats} onChange={handleFormat}
                                   aria-label="text formatting">
                    <ToggleButton value="asc" aria-label="asc">
                        <ArrowDownwardIcon/>
                    </ToggleButton>
                    <ToggleButton value="student" aria-label="student">Etudiant</ToggleButton>
                    <ToggleButton value="teacher" aria-label="teacher">Professeur</ToggleButton>
                    <ToggleButton value="admin" aria-label="admin">Admin</ToggleButton>
                </ToggleButtonGroup>
                <Button className="buttonAddUser" color={"primary"} variant={"outlined"} onClick={handleClickOpen}>Ajouter
                    un nouvel utilisateur</Button>
            </Paper>

            <GridList className="containerUser" cellHeight={"auto"} cols={5} spacing={16}>
                {
                    search !== undefined ? search.map((user: User, index) => {
                        return <CustomUserItem user={user} removeHandler={(user: User) => removeUser(user)}/>

                    }) : ""
                }
            </GridList>
        </div>
    )

}

export default ListAllUser
