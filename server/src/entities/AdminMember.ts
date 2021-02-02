import {Student} from "./Student";
import {Teacher} from "./Teacher";
import {User} from "./User";
import {Subject} from "./Subject";
import {Lesson} from "./Lesson";
import {Promo} from "./Promo";


export default class AdminMember extends User{
    private students!: Student[];
    private teachers !: Teacher[];
    private subjects!: Subject[];
    private promos !: Promo[];
    private lessons !: Lesson[];
}