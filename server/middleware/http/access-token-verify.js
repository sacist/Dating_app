const jwt=require('jsonwebtoken')
require('dotenv').config()
const refreshAccessToken = require('./refresh-access')

const JWTKEY=process.env.JWT_KEY

const checkAccessToken=async(req,res,next)=>{
    let accessToken=req.cookies.accessToken
    try {
        if(!accessToken){
            const refreshedToken=await refreshAccessToken(req,res)
            if(!refreshedToken) return
            accessToken=refreshedToken
        }
        const decoded=jwt.verify(accessToken,JWTKEY)
        req.userId=decoded.user_id
        next()
    } catch (e) {
        const refreshedToken=await refreshAccessToken(req,res)
        if(!refreshedToken) return

        accessToken=refreshedToken

        try {
            const decoded=jwt.verify(accessToken,JWTKEY)
            req.userId=decoded.user_id
            
            next()
        } catch (error) {
            return res.status(401).json({error:'Ошибка проверки токена'})
        }

    }
}

module.exports = checkAccessToken;