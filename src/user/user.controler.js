import { userModel } from "../../DB/user model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { promisify } from 'util';
import { emailConfirmed } from "../services/confirmEmail.js";
import catchError  from "../middelware/ErrorHandeling.js";
import AppError from "../utilities/app.err.js";

export const getAllUser = catchError(async (req, res, next) => {
    const users = await userModel.find()
    res.status(201).json({ message: "Done", users })
})


export const signUp = catchError(async (req, res,next) => {
    const newUser = req.body
    const email = req.body.email


    const emailExsisted = await userModel.find({ email })

    if (emailExsisted.length > 0) {
        return next(new AppError("This Email Already Exsited", 400))
    }
    else {

        req.body.password = bcrypt.hashSync(req.body.password, 8)

        const newData = await userModel.insertMany(newUser)
        if (!newData) {
            return next(new AppError("Did't Find Any Data To Signup", 404))
        }

        emailConfirmed(email)
        res.status(201).json({ message: "Signup Successfully", newData })
    }
}
)


export const signIn = catchError(async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    let userExisted = await userModel.findOne({ email })
    let passwordMatch = bcrypt.compareSync(password, userExisted.password);



    // let user_with_findOne = await userModel.findOne({email:userAccount.email})
    // let user_with_find = await userModel.find({email:userAccount.email})
    // console.log(user_with_findOne);
    // console.log(user_with_find);
    // find return ARR[] of object
    // findOne return only the match one

    // console.log(req.body.password);
    // console.log(userExisted.password);
    // console.log(password);  
    // console.log(userExisted);  
    // console.log(user);  

    if (!userExisted) {
        return next(new AppError("Account isn't exsist. please Sign up First", 400))
    }

    if (!passwordMatch) {
        return next(new AppError("Wrong password", 422))
    }

    if (userExisted.isConfirmed == false) {
        return next(new AppError("please verify your account with your email", 401))
    }

    let token = jwt.sign({ _id: userExisted._id, role: userExisted.role }, "Stitch")
    res.status(201).json({ message: "SignIn Successfully", token })
})

const verifyToken = promisify(jwt.verify);

export const verify = catchError(async (req, res, next) => {
    try {
        // Verify the token using promisify
        const decoded = await verifyToken(req.params.token, "EmailVery");
        
        // Find and update the user
        const userVerify = await userModel.findOneAndUpdate(
            { email: decoded }, // Adjust according to your decoded payload structure
            { isConfirmed: true },
            { new: true }
        );

        if (userVerify) {
            res.status(201).json({ message: "User Confirmed", userVerify });
        } else {
            next(new AppError("User not found", 404));
        }
    } catch (err) {
        // Handle token verification errors and other errors
        next(new AppError(err.message || "Internal Server Error", 400));
    }
});

export const updateUser = catchError(async (req, res, next) => {
    const { email } = req.body.email
    const newData = req.body

    const userExisted = await userModel.findOneAndUpdate(
        email,
        newData,
        { new: true }
    );

    if (userExisted) {
        res.status(201).json({ message: "user updated", userExisted })
    }
    else {
        next(new AppError("user not found", 404))
    }
})


export const deleteUser = catchError(async (req, res, next) => {
    const { id } = req.params


    const userExisted = await userModel.findByIdAndDelete(id, { new: true });

    if (userExisted) {
        res.status(201).json({ message: "user deleted", userExisted })
    }
    else {
        next(new AppError("user not found", 404))
    }
})