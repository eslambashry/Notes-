import { noteModel } from "../../DB/note model/note.model.js";
import catchError  from "../middelware/ErrorHandeling.js";
import AppError from "../utilities/app.err.js";



export const addNote = catchError(async (req, res) => {

    const newDate = await noteModel.insertMany(req.body)

    if(newDate){
    res.status(201).json({ message: "done", newDate })
    }

    else{
    return next(new AppError("Notes Not Founded",404))
    }
})


export const getAllNotes = catchError (async (req, res) => {
    
    const notes = await noteModel.find().populate("userId")

        res.status(201).json({ message: "done", notes })
    
})


export const updateNote = catchError(async (req, res, next) => {
    const { id } = req.params
    const newData = req.body

    const noteExisted = await noteModel.findByIdAndUpdate(
        id,
        newData,
        { new: true }
    );

    if (noteExisted) {
        res.status(201).json({ message: "note updated", noteExisted })
    }
    else {
        next(new AppError("note not found", 404))
    }
})


export const deleteNote = catchError(async (req, res, next) => {
    const { id } = req.params


    const noteExisted = await noteModel.findByIdAndDelete(id, { new: true });

    if (noteExisted) {
        res.status(201).json({ message: "note deleted", noteExisted })
    }
    else {
        next(new AppError("note not found", 404))
    }
})