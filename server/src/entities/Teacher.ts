import {User} from './User';
import {Subject} from './Subject';
import {Promo} from './Promo';
import {Lesson} from './Lesson';
import { Field, InputType, ObjectType} from 'type-graphql';
import { prop } from '@typegoose/typegoose';

@ObjectType('TeacherType')
@InputType('TeacherInput')
export class Teacher extends User {
    // @Field(() => [Subject])
    // @prop()
    // subjects: Subject[];
    @Field(() => [Lesson])
    @prop()
    lessons: Lesson[];
    // @Field(() => [Promo])
    // @prop()
    // promos: Promo[];

}