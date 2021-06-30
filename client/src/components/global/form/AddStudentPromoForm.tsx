import {gql, useQuery} from "@apollo/client";
import {Chip, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import React, {ReactElement, useContext, useEffect, useState} from "react";
import {User} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import { Subject } from "../../dashboard/dashboard-admin/ModalAddSubject/ModalAddSubject";
import './AddStudentPromoForm.css'


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

const AddStudentPromoForm = (): ReactElement => {
    const SEARCH_USER = gql`
        query($role: String!) {
            findUsersByRole(role: $role) {
                _id
                lastName
                firstName
                email
                role
            }
        }
    `;

    const SEARCH_SUBJECT = gql`
        query($test: String!) {
            getAllSubjects(test:$test) {
                name
            }
        }
    `;

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const users = useQuery(SEARCH_USER, {variables: {role: "User"}})
    const subject = useQuery(SEARCH_SUBJECT)


    const [search, setSearch] = useState<User[]>([])
    const [searchSubjects, setSubjects] = useState<Subject[]>([])

    useEffect(() => {
        if (users.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(users.data.findUsersByRole)))
            setSearch(JSON.parse(JSON.stringify(users.data.findUsersByRole)))
        }
    }, [users.data])

    useEffect(() => {
        if (subject.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(subject.data.findUsersByRole)))
            setSubjects(JSON.parse(JSON.stringify(subject.data.findUsersByRole)))
        }
    }, [subject.data])


    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event: any) => {
        setPersonName(event.target.value);
    };

    const handleChangeMultiple = (event: any) => {
        const {options} = event.target;
        const value = [User];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };

    const classes = useStyles();
    const theme = useTheme();


    return (
        <div className="inputText">
            <TextField label="Nom de la promo"
                       autoFocus
                       id="standard-basic"
                       margin="dense"
                       fullWidth
                       required
                       className="inputText"/>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{"Choisissez un ou plusieurs étudiants"}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    fullWidth
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {selected.map((value: any) => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{
                    search !== undefined ? search.map((data: User) => (
                        <MenuItem key={data._id.toString()}
                                  value={data.firstName + " " + data.lastName}
                                  style={getStyles(data.firstName, personName, theme)}>
                            {data.firstName + " " + data.lastName}
                        </MenuItem>
                    )) : ""
                }
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label-2">{"Choisissez un ou plusieurs sujets"}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label-2"
                    id="demo-mutiple-chip-2"
                    multiple
                    fullWidth
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip-2"/>}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {selected.map((value: any) => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{

                    searchSubjects !== undefined ? searchSubjects.map((data: Subject, index: number) => (
                        <MenuItem key={index.toString()}
                                  value={data.name}
                                  style={getStyles(data.name, personName, theme)}>
                            {data.name}
                        </MenuItem>
                    )) : ""
                }
                </Select>
            </FormControl>
        </div>

    )
}

export default AddStudentPromoForm

function getStyles(name: any, personName: any[], theme: Theme): React.CSSProperties {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
