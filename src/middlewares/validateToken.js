import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../../config.js"

export const authRequired = (req,res,next)=>{

    const {token} = req.cookies

    if(!token) return res.status(401).json({ok:false, message: "No token , authorization required"})

    jwt.verify(token, TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(err).json({ok:false, message:"Invalid Token"})
        
       req.user = user

        next()
    })

}