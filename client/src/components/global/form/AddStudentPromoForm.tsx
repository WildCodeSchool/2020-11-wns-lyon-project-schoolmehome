import {gql, useQuery} from "@apollo/client";
import {Chip, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme, useTheme} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import React, {ReactElement, useContext, useEffect, useState} from "react";
import {User} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import {PromoInput} from "../../dashboard/dashboard-admin/ModalAddPromo/ModalAddPromo";
import {SubjectInput} from "../../dashboard/dashboard-admin/ModalAddSubject/ModalAddSubject";
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


interface AddStudentPromoFormProps {
    getUsers: (user: User[]) => void
    getSubject: (subject: SubjectInput[]) => void
    getPromoName: (name: string) => void
}

const AddStudentPromoForm = ({getUsers, getPromoName, getSubject}: AddStudentPromoFormProps): ReactElement => {
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
        query {
            getAllSubjects {
                _id
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
    const [searchSubjects, setSubjects] = useState<SubjectInput[]>([])

    useEffect(() => {
        if (users.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(users.data.findUsersByRole)))
            setSearch(JSON.parse(JSON.stringify(users.data.findUsersByRole)))
        }
    }, [users.data])

    useEffect(() => {
        if (subject.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(subject.data.getAllSubjects)))
            setSubjects(JSON.parse(JSON.stringify(subject.data.getAllSubjects)))
        }
    }, [subject.data])


    const [personName, setPersonName] = React.useState([]);
    const [subjectName, setSubjectName] = React.useState([]);

    const findUserNameWith = (id: string): string => {
        const user = search.find((user: User) => user._id == id)
        return user.firstName + " " + user.lastName
    }

    const findSubjectWith = (id: string): string => {
        const subject = searchSubjects.find((subject: SubjectInput) => subject._id == id)
        return subject.name
    }

    const handleChangePerson = (event: any) => {
        const selectedUser: User[] = []
        event.target.value.forEach((id: string) => {
            const user = search.find((user: User) => user._id.toString() == id)
            selectedUser.push(user);
        })

        setPersonName(event.target.value);
        getUsers(selectedUser)
    };
    const handleChangeSubject = (event: any) => {
        const selectedSubject: SubjectInput[] = []
        event.target.value.forEach((id: string) => {
            const subject = searchSubjects.find((subject: SubjectInput) => subject._id == id)
            selectedSubject.push(subject);
        })
        setSubjectName(event.target.value);
        console.log(selectedSubject)
        getSubject(selectedSubject)

    };

    const handleChangeMultipleUser = (event: any) => {
        const {options} = event.target;
        const value: User[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };

    const handleChangeMultipleSubject = (event: any) => {
        const {options} = event.target;
        const value: SubjectInput[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSubjectName(value);
    }

    const classes = useStyles();
    const theme = useTheme();

    const handleRemove = (tab: string[], id: string) => {
        tab.splice(tab.indexOf(id))
        setPersonName(tab)
    }


    return (
        <div className="inputText">
            <TextField label="Nom de la promo"
                       autoFocus
                       id="standard-basic"
                       margin="dense"
                       fullWidth
                       required
                       onChange={e => getPromoName(e.target.value)}
                       className="inputText"/>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{"Choisissez un ou plusieurs étudiants"}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    fullWidth
                    value={personName}
                    onChange={handleChangePerson}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {
                                selected.map((id: string) => {
                                    return <Chip key={id} label={findUserNameWith(id)} className={classes.chip} onDelete={(e) => handleRemove(selected, id)} onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}/>
                                })
                            }
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{
                    search !== undefined ? search.map((data: User, index: number) => (
                        <MenuItem key={index}
                                  value={data._id.toString()}
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
                    value={subjectName}
                    onChange={handleChangeSubject}
                    input={<Input id="select-multiple-chip-2"/>}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {selected.map((id: any) => (
                                <Chip key={id} label={findSubjectWith(id)} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{

                    searchSubjects !== undefined ? searchSubjects.map((data: SubjectInput, index: number) => (
                        <MenuItem key={index.toString()}
                                  value={data._id}
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