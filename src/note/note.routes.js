import Router from "express"
import { verifyToken } from "../middelware/verify.token.js"
import { addNote, deleteNote, getAllNotes, updateNote } from "./note.controler.js"

const noteRoutes = Router()


noteRoutes.get("/getAllNotes", getAllNotes)
noteRoutes.post("/addNote",verifyToken, addNote)
noteRoutes.patch("/updateNote/:id", updateNote)
noteRoutes.delete("/deleteNote/:id", deleteNote)


 export default noteRoutes