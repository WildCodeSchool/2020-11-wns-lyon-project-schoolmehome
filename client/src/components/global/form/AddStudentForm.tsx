import React, {ReactElement, useContext, useEffect, useState} from "react";
import {Chip, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, useTheme} from "@material-ui/core";
import {UserFormContext} from "../../dashboard/dashboard-admin/DashboardAdmin";
import {User, UserFormData} from "../../dashboard/dashboard-admin/ModalAddNewUser/ModalAddNewUser";
import { SubjectInput } from "../../dashboard/dashboard-admin/ModalAddSubject/ModalAddSubject";
import {gql, useQuery } from "@apollo/client";
import { PromoInput } from "../../dashboard/dashboard-admin/ModalAddPromo/ModalAddPromo";


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

    const SEARCH_PROMO = gql`
        query {
            getAllPromos {
                _id
                name
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

    const promo = useQuery(SEARCH_PROMO)
    const subject = useQuery(SEARCH_SUBJECT)

    const theme = useTheme();

    const [search, setSearch] = useState<PromoInput[]>([])
    const [searchSubjects, setSubjects] = useState<SubjectInput[]>([])

    useEffect(() => {
        if (promo.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(promo.data.getAllPromos)))
            setSearch(JSON.parse(JSON.stringify(promo.data.getAllPromos)))
        }
    }, [promo.data])

    useEffect(() => {
        if (subject.data !== undefined) {
            console.log(JSON.parse(JSON.stringify(subject.data.getAllSubjects)))
            setSubjects(JSON.parse(JSON.stringify(subject.data.getAllSubjects)))
        }
    }, [subject.data])


    const [promoName, setPromoName] = React.useState([]);
    const [subjectName, setSubjectName] = React.useState([]);

    const findUserNameWith = (id: string): string => {
        const promo = search.find((promo: PromoInput) => promo._id == id)
        return promo.name
    }

    const findSubjectWith = (id: string): string => {
        const subject = searchSubjects.find((subject: SubjectInput) => subject._id == id)
        return subject.name
    }

    const handleChangePerson = (event: any) => {
        const selectedUser: PromoInput[] = []
        event.target.value.forEach((id: string) => {
            const promo = search.find((promo: PromoInput) => promo._id.toString() == id)
            selectedUser.push(promo);
        })
        console.log(selectedUser)
        user.promo = selectedUser
        setUser(user)
        setStudentData(user)
        setPromoName(event.target.value);
    };
    const handleChangeSubject = (event: any) => {
        const selectedSubject: SubjectInput[] = []
        event.target.value.forEach((id: string) => {
            const subject = searchSubjects.find((subject: SubjectInput) => subject._id == id)
            selectedSubject.push(subject);
        })
        setSubjectName(event.target.value);
        user.subject = selectedSubject
        setUser(user)
        setStudentData(user)

        console.log(selectedSubject)
    };

    const handleChangeMultipleUser = (event: any) => {
        const {options} = event.target;
        const value: User[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPromoName(value);
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

    const handleRemovePerson = (tab: string[], id: string) => {
        const filteredTab = tab.filter((idRef: string) => idRef !== id)
        setPromoName(filteredTab)
    }

    const handleRemoveSubject = (tab: string[], id: string) => {
        const filteredTab = tab.filter((idRef: string) => idRef !== id)
        setSubjectName(filteredTab)
    }

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
        user.role = event.target.value as string
        setUser(user)
        console.log(user)

        setStudentData(user)
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
                    onChange={(e) => handleChange(e)}>

                    <MenuItem value={"User"}>Etudiant</MenuItem>
                    <MenuItem value={"Teacher"}>Professeur</MenuItem>
                    <MenuItem value={"Admin"}>Administrateur</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{"Choisissez un ou plusieurs étudiants"}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    fullWidth
                    value={promoName}
                    onChange={handleChangePerson}
                    input={<Input id="select-multiple-chip"/>}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {
                                selected.map((id: string) => {
                                    return <Chip key={id} label={findUserNameWith(id)} className={classes.chip}
                                                 onDelete={(e) => handleRemovePerson(selected, id)} onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}/>
                                })
                            }
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{
                    search !== undefined ? search.map((data: PromoInput, index: number) => (
                        <MenuItem key={index}
                                  value={data._id.toString()}
                                  style={getStyles(data.name, promoName, theme)}>
                            {data.name}
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
                                <Chip key={id} label={findSubjectWith(id)} className={classes.chip}
                                      onDelete={(e) => handleRemoveSubject(selected, id)}
                                      onMouseDown={(event) => {
                                          event.stopPropagation();
                                      }}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >{

                    searchSubjects !== undefined ? searchSubjects.map((data: SubjectInput, index: number) => (
                        <MenuItem key={index.toString()}
                                  value={data._id}
                                  style={getStyles(data.name, promoName, theme)}>
                            {data.name}
                        </MenuItem>
                    )) : ""
                }
                </Select>
            </FormControl>
        </div>
    )
}

function getStyles(name: any, personName: any[], theme: Theme): React.CSSProperties {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default UserForm