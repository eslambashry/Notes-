import mongoose,{Schema,model} from "mongoose";

const noteSchema = new Schema({
    title:String,
    description:String,
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true,versionKey:false})

export const noteModel = model("Note",noteSchema)