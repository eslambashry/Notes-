import AppError from "../utilities/app.err.js";



export function catchError(callBack) {
    return (req,res,next)=>{
        callBack(req,res,next).catch(err=>{
            next(new AppError(err,400))
        })
    }
}