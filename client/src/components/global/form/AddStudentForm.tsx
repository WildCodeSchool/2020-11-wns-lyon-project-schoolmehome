import React, {ReactElement, useContext, useState} from "react";
import {FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import {UserFormContext} from "../../dashboard/dashboard-admin/DashboardAdmin";
import {UserFormData} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        maxWidth: "100%",
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        // backgroundColor: 'var(--primary)',
        backgroundColor: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
        color: 'var(--color-text-on-accent)'
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const UserForm = (): ReactElement => {




    const [studentData, setStudentData] = useContext(UserFormContext)
    const [user, setUser] = useState(new UserFormData("", "", "", "", "", [], [], []))

    // console.log(studentData instanceof UserFormData)
    const updateStudentData = (key: String, value: String) => {
        switch (key) {
            case "FirstName" :
                studentData.firstName = value
                user.firstName = value
                setUser(user)
                break;
            case "LastName" :
                studentData.lastName = value
                user.lastName = value
                setUser(user)
                break;
            case "Email" :
                studentData.email = value
                user.email = value
                setUser(user)
                break;
        }
        // console.log(studentData instanceof UserFormData)
        setStudentData(studentData)
    }

    const [role, setRole] = React.useState('User');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRole(event.target.value as string);
    };

    const classes = useStyles();


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
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={"User"}>Etudiant</MenuItem>
                    <MenuItem value={"Teacher"}>Professeur</MenuItem>
                    <MenuItem value={"Admin"}>Administrateur</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default UserForm