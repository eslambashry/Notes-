import express from "express"
import { connectionDB } from "./DB/connection.js"
import noteRoutes from "./src/note/note.routes.js"
import userRoutes from "./src/user/user.routes.js"
import AppError from "./src/utilities/app.err.js"
const app = express()
const port = 3000

app.use(express.json())

connectionDB
app.use(userRoutes)
app.use(noteRoutes)


app.use("*",(req,res,next)=>{
   next(new AppError("URL not found",404))
})


// app.use((err,req,res,next)=>{
//     res.status(err.statusCode || 500).json({message:err.message})
// })



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))