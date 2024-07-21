import AppError from "../utilities/app.err.js";



export default function catchError(callBack) {
    return (req,res,next)=>{
        callBack(req,res,next).catch(err=>{
            next(new AppError(err,400))
        })
    }
}