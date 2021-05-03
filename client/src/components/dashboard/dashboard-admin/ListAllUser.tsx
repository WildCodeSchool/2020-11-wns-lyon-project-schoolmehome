import React, {ReactElement, useEffect, useState} from "react";
// import {List, ListItem, Paper} from "@material-ui/core";
import {empty, gql, useMutation, useQuery} from "@apollo/client";
// import CustomUserItem from "../../global/viewholder/CustomUserItem";
import "./ListAllUser.css"
// import IconButton from "@material-ui/core/IconButton";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
import {User} from "./ModalAddNewUser/ModalAddNewUser";
// import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
// import  ArrowDownwardIcon  from '@material-ui/icons/ArrowDownward';
import {stringify} from "querystring";

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
    const [value, setName] = useState<String>("")
    const {loading, error, data} = useQuery(SEARCH_USER, {variables: {name: value}})

    const [search, setSearch] = useState<User[]>([])

    useEffect(() => {
        if (data !== undefined) {
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
                            return user.role === "User"
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
            if(formatFetchData.length > 0) {
                tempData = formatFetchData
                console.log("woauh")
            }
            if (newFormats.includes("asc")) {
                tempData.sort((user: User, user2: User) => {
                    return user.firstName > user2.firstName ? 1 : -1
                })
            }else {
                tempData.sort((user: User, user2: User) => {
                    return user.firstName < user2.firstName ? 1 : -1
                })
            }
            setSearch(tempData)
        }
    };


    return (
        <div>
            {/* <Paper component="form">
                <InputBase
                    onChange={e => {
                        loadDynamicQuery(e.target.value)
                    }}
                    placeholder="Search Google Maps"
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
                    <ToggleButton value="asc" aria-label="asc">
                        <ArrowDownwardIcon/> 
                    </ToggleButton>
                    <ToggleButton value="student" aria-label="student">Etudiant</ToggleButton>
                    <ToggleButton value="teacher" aria-label="teacher">Professeur</ToggleButton>
                    <ToggleButton value="admin" aria-label="admin">Admin</ToggleButton>
                </ToggleButtonGroup>
            </Paper>
            <List>
                {
                    search !== undefined ? search.map((user: User, index) => {
                        return <Paper key={index} className="margin-list-item"><CustomUserItem user={user}/></Paper>
                    }) : ""
                }
            </List> */}
        </div>
    )

}

export default ListAllUser
