import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

//Middleware para verificar el token en las peticiones
export const authRequired = (req,res,next)=>{

    const {token} = req.cookies

    if(!token) return res.status(401).json({ok:false, message: "No token , authorization required"})

    jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.status(err).json({ok:false, message:"Invalid Token"})
        
       req.user = user

        next()
    })

}