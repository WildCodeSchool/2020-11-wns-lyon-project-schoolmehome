import AdminMember from "../entities/AdminMember";
import { getModelForClass } from "@typegoose/typegoose";
import { Arg, Mutation } from "type-graphql";



export class AdminResolver{
    @Mutation(() => AdminMember)
    public async create(@Arg('data') data: AdminMember):Promise<AdminMember>{
        const model = getModelForClass(AdminMember);
        return await model.create(data)
    }   
        public async read (@Arg('data') data: AdminMember): Promise<AdminMember[]>{
        const model = getModelForClass(AdminMember)
        const AdminMembers = await model.find()
            .populate("promo")
            .populate("lessons")
            .populate("subject")
        return AdminMembers
    }
    public async patch (@Arg('data') data: AdminMember): Promise<AdminMember> {
        const model = getModelForClass(AdminMember)
        const teacher = await model.findOne({"_id": data._id})
        Object.assign(teacher, data)
        return await model.create()
    }
    public async  update(@Arg('data') data: AdminMember): Promise<AdminMember>{
        const model = getModelForClass(AdminMember);
        const teacherId = data._id
        const teacher = await model.findOne({"_id": teacherId})
        Object.assign(data._id, data)
        return await model.create(teacher)
    }
    public async findOne(@Arg('data') data: AdminMember): Promise<AdminMember>{
        const model = getModelForClass(AdminMember);
        const teacherId = data._id
        return await model.findOne({"_id": teacherId})
            .populate("promo")
            .populate("lessons")
            .populate("subject")
    }

}