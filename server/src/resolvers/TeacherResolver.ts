import {Teacher} from "../entities/Teacher";
import {arrayNotEmpty, isEmpty} from "class-validator";
import { Arg } from "type-graphql";
import { getModelForClass } from "@typegoose/typegoose";


export class TeacherResolver {
    public async create (@Arg('data') data: Teacher): Promise<Teacher>{
        const model = getModelForClass(Teacher)
        return await model.create(data)
    }
    public async read (@Arg('data') data: Teacher): Promise<Teacher[]>{
        const model = getModelForClass(Teacher)
        const teachers = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
        return teachers
    }
    public async patch (@Arg('data') data: Teacher): Promise<Teacher> {
        const model = getModelForClass(Teacher)
        const teacher = await model.findOne({"_id": data._id})
        Object.assign(teacher, data)
        return await model.create()
    }
    public async  update(@Arg('data') data: Teacher): Promise<Teacher>{
        const model = getModelForClass(Teacher);
        const teacherId = data._id
        const teacher = await model.findOne({"_id": teacherId})
        Object.assign(data._id, data)
        return await model.create(teacher)
    }
    public async findOne(@Arg('data') data: Teacher): Promise<Teacher>{
        const model = getModelForClass(Teacher);
        const teacherId = data._id
        return await model.findOne({"_id": teacherId})
            .populate("promo")
            .populate("lessons")
            .populate("subject")
    }
    public async findLesson(@Arg('data') data: Teacher): Promise<Teacher>{
        const teacherId = data._id
        const model = getModelForClass(Teacher)
        return await model.findOne({"_id": teacherId})
            .populate("promos")
            .populate("lessons")
            .populate("subject").select("lessons")
            
    }
    public async findPromo(@Arg('data') data: Teacher): Promise<Teacher> {
        const teacherId = data._id;
        const model = getModelForClass(Teacher);
        return await model.findOne({"_id": teacherId})
            .populate("promos")
            .populate("lessons")
            .populate("subject").select("promo")
    }
    public async findSubject(@Arg('data') data : Teacher): Promise<Teacher>{
        const teacherId = data._id;
        const model = getModelForClass(Teacher);
        return await model.findOne({"_id": teacherId})
            .populate("lessons")
            .populate("lessons")
            .populate("subject").select("subject")
    }
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