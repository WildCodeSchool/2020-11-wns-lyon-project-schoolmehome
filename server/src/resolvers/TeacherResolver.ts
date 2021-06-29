import {Teacher} from "../entities/Teacher";
import {arrayNotEmpty, isEmpty} from "class-validator";
import { getModelForClass } from "@typegoose/typegoose";
import { Arg, Resolver, Mutation, Query, Ctx } from "type-graphql";
import { Auth } from "../services/AuthService";
import { User } from "../entities/User";
import moment, { localeData } from "moment";
import { UserService } from "../services/UserService";
import { Lesson } from "../entities/Lesson";

@Resolver(() => Teacher)
export class TeacherResolver {

    // @Mutation(() => Teacher)
    // public async createTeacher (@Arg('data') data: Teacher): Promise<Teacher>{
      
    //     const model = getModelForClass(Teacher)
    //     return await Auth.createTeacher(data);
    // }

    // @Mutation(() => Teacher)
    // public async signupTeacher(@Arg('data', () => Teacher) data: Teacher): Promise<Teacher> {
    //   return await UserService.signUpTeacher(data);
    // };

    // public async read (@Arg('data') data: Teacher): Promise<Teacher[]>{
    //     const model = getModelForClass(Teacher)
    //     const teachers = await model.find()
    //         .populate("promo")
    //         .populate("lessons")
    //         .populate("subject")
    //     return teachers
    // }
    // public async patch (@Arg('data') data: Teacher): Promise<Teacher> {
    //     const model = getModelForClass(Teacher)
    //     const teacher = await model.findOne({"_id": data._id})
    //     Object.assign(teacher, data)
    //     return await model.create()
    // }
    // public async  update(@Arg('data') data: Teacher): Promise<Teacher>{
    //     const model = getModelForClass(Teacher);
    //     const teacherId = data._id
    //     const teacher = await model.findOne({"_id": teacherId})
    //     Object.assign(data._id, data)
    //     return await model.create(teacher)
    // }
    // public async findOne(@Arg('data') data: Teacher): Promise<Teacher>{
    //     const model = getModelForClass(Teacher);
    //     const teacherId = data._id
    //     return await model.findOne({"_id": teacherId})
    //         .populate("promo")
    //         .populate("lessons")
    //         .populate("subject")
    // }

    @Query(() => Teacher)
    public async findbyId(@Arg('id') id: string): Promise<Teacher>{
        const model = getModelForClass(Teacher)
        return await model.findOne({"_id": id})
            // .populate("promos")
            // .populate("lessons")
            // .populate("subject").select("lessons")
            
    }

    
    @Query(() => Lesson, { nullable: true })
    public async findNextlesson(@Arg('email') email: string): Promise<Lesson>{

      const model = getModelForClass(User)
      const lessonModel = getModelForClass(Lesson);
      const teacher = await model.findOne({email}).populate('lessons', undefined, lessonModel).exec()
      if(teacher.lessons.length === 0)
        return null
        
      return teacher.lessons
        .filter(l => moment(l.start) > moment(Date.now()))
        .sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))[0] 
    }
    // public async findPromo(@Arg('data') data: Teacher): Promise<Teacher> {
    //     const teacherId = data._id;
    //     const model = getModelForClass(Teacher);
    //     return await model.findOne({"_id": teacherId})
    //         .populate("promos")
    //         .populate("lessons")
    //         .populate("subject").select("promo")
    // }
    // public async findSubject(@Arg('data') data : Teacher): Promise<Teacher>{
    //     const teacherId = data._id;
    //     const model = getModelForClass(Teacher);
    //     return await model.findOne({"_id": teacherId})
    //         .populate("lessons")
    //         .populate("lessons")
    //         .populate("subject").select("subject")
    // }

    @Query(() => Teacher)
    public async findTeachersWithLessons(@Arg('data') data: Teacher): Promise<Teacher[]> {
        const model = getModelForClass(Teacher)
        return await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
            .then((teachers: Teacher[]) => {
                const teacherWithLessons = teachers.filter((teacher) =>
                    arrayNotEmpty(teacher.lessons)
                )
                if (arrayNotEmpty(teacherWithLessons)) {
                    return teacherWithLessons
                }
            })
        }
}