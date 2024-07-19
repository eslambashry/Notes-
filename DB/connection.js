import mongoose from "mongoose";

export const connectionDB = mongoose.connect('mongodb://127.0.0.1:27017/Notes')
.then(() => { console.log("connected Successfully"); })
.catch(() => { console.log("connected failed") })


































