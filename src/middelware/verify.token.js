import jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    let {token} = req.headers;

    jwt.verify(token,"Stitch",(err,decoded) => {
        if(err) return res.status(401).json({message:"Invalid Token"})

        // console.log(decoded);
        next() // => go to the next api
    })


}