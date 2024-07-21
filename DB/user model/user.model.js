import {Schema,model} from "mongoose";


const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique: true
    },
    password:{
        type:String,
    },
    age:Number,
    gender:{
        type:String,
        require:true,
        enum:['m','f']
    },
    isConfirmed:{
        type:Boolean,
        default:false,
        require:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true,versionKey:false})

export const userModel = model("User",userSchema)