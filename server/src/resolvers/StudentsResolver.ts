import { getModelForClass } from "@typegoose/typegoose";
import {Request, Response} from "express";
import { Arg } from "type-graphql";
import {Student} from "../entities/Student";

export class StudentsResolver{
    public async create(@Arg('data') data: Student): Promise<Student>{
        const model =  getModelForClass(Student)
        return await model.create(data)
    }
    public async read (@Arg('data') data: Student): Promise<Student[]>{
        const model = getModelForClass(Student)
        const students = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
        return students
    }
    public async patch (@Arg('data') data: Student): Promise<Student> {
        const model = getModelForClass(Student)
        const student = await model.findOne({"_id": data._id})
        Object.assign(student, data)
        return await model.create()
    }
    public async  update(@Arg('data') data: Student): Promise<Student>{
        const model = getModelForClass(Student);
        const studentId = data._id
        const student = await model.findOne({"_id": studentId})
        Object.assign(data._id, data)
        return await model.create(student)
    }
    public async findOne(@Arg('data') data: Student): Promise<Student>{
        const model = getModelForClass(Student);
        const studentId = data._id
        return await model.findOne({"_id": studentId})
            .populate("promo")
            .populate("lessons")
            .populate("subject")
    }
}