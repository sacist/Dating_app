const jwt=require('jsonwebtoken')
require('dotenv').config()
const pool=require('../../config/db')
const cookie=require('cookie')


const JWTREFRESH=process.env.JWT_REFRESH
const JWTKEY=process.env.JWT_KEY

const refreshAccessTokenWebsocket=async (socket) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const refToken=cookies.refreshToken
    let client
    if(!refToken){
        return false
    }
    try {
        client=await pool.connect()
        const verifiedRefToken=jwt.verify(refToken,JWTREFRESH)
        const UUID=verifiedRefToken.refTokenId
    
        const refTokenData=await pool.query('SELECT * FROM refresh_token_info WHERE id = $1',[UUID])
        const nicknameQuery=await pool.query('SELECT nickname FROM users WHERE id = $1',[refTokenData.rows[0].user_id])
        if(refToken!==refTokenData.rows[0].token){
            return false
        }
        if(refTokenData.rows[0].expires_at<Date.now()){
            return false
        }
        
        const accessToken=jwt.sign({user_id:refTokenData.rows[0].user_id},JWTKEY,{
            expiresIn:'20m'
        })
        socket.emit('refresh-access-token')
        socket.nickname=nicknameQuery.rows[0].nickname
        return accessToken
    } catch (e) {
        console.log(e);  
        return false
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports=refreshAccessTokenWebsocket