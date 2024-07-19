import Router from "express"
import { deleteUser, getAllUser, signIn, signUp, updateUser, verify } from "./user.controler.js"

const userRoutes = Router()

userRoutes.get("/getAllUser",getAllUser)
userRoutes.post("/signUp",signUp)
userRoutes.post("/signIn",signIn)
userRoutes.get("/verify/:token",verify)
userRoutes.patch("/updateUser",updateUser)
userRoutes.delete("/deleteUser/:id",deleteUser)




export default userRoutes 