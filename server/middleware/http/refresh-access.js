const jwt=require('jsonwebtoken')
require('dotenv').config()
const pool=require('../../config/db')
const cookie=require('cookie')


const JWTREFRESH=process.env.JWT_REFRESH
const JWTKEY=process.env.JWT_KEY

const refreshAccessToken=async (req,res) => {
    const refToken=req.cookies.refreshToken
    let client
    if(!refToken){
        res.status(401).json({error:'Refresh token не найден'})
        return false
    }
    try {
        client=await pool.connect()
        const verifiedRefToken=jwt.verify(refToken,JWTREFRESH)
        const UUID=verifiedRefToken.refTokenId
    
        const refTokenData=await pool.query('SELECT * FROM refresh_token_info WHERE id = $1',[UUID])
    
        if(refToken!==refTokenData.rows[0].token){
            res.status(401).json({accessError:'Несанкционированный доступ'})
            return false
        }
        if(refTokenData.rows[0].expires_at<Date.now()){
            res.status(401).json({tokenExpiredError:'Срок действия токена истёк'})
            return false
        }
    
        const accessToken=jwt.sign({user_id:refTokenData.rows[0].user_id},JWTKEY,{
            expiresIn:'20m'
        })
        res.setHeader('Set-Cookie',
                    cookie.serialize('accessToken',
                        accessToken, {
                        httpOnly: true,
                        sameSite: "strict",
                        path: "/",
                        maxAge: 60 * 20
                    })
                )
        return accessToken
    } catch (e) {
        console.log(e);
        res.status(500).json({error:'Ошибка на сервере'})     
        return false
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports=refreshAccessToken