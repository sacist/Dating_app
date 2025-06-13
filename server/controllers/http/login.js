const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const cookie = require('cookie')
const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const checkTypesError=require('../check-types')
const {photoCache}=require('../../caching')

const JWTREFRESH = process.env.JWT_REFRESH
const JWTKEY = process.env.JWT_KEY

class LoginController {
    async Login(req, res) {
        const { loginData, password } = req.body
        const hasError=checkTypesError([loginData,password],'string')
        if(hasError){
            return res.status(500).json({ error: 'Ошибка на сервере' })
        }
        let client
        try {
            client = await pool.connect()

            const existingLoginDataQuery = await client.query('SELECT * FROM users WHERE email = LOWER($1) OR nickname ILIKE $1', [loginData])
            if (existingLoginDataQuery.rowCount === 0) {
                return res.json({ loginDataError: 'Проверьте правильность введённых данных' })
            }
            const uncryptedPwd = await bcrypt.compare(password, existingLoginDataQuery.rows[0].password)

            if (!uncryptedPwd) {
                return res.json({ passwordError: 'Неправильный пароль' })
            }

            const userId = existingLoginDataQuery.rows[0].id

            const refTokenId = crypto.randomUUID()
            const refToken = jwt.sign({ refTokenId }, JWTREFRESH, {
                expiresIn: '30d',
            })
            await client.query(`INSERT INTO refresh_token_info (id,user_id,token,expires_at) VALUES ($1,$2,$3,NOW() + INTERVAL '30 days')`, [refTokenId, userId, refToken])

            const accessToken = jwt.sign({ user_id: userId }, JWTKEY, {
                expiresIn: '20m'
            })

            res.append('Set-Cookie',
                cookie.serialize('accessToken',
                    accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 60 * 20
                })
            )

            res.append('Set-Cookie',
                cookie.serialize('refreshToken',
                    refToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 30
                })
            )
            return res.json({ success: 'Успешный вход' })
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Ошибка на сервере' })
        } finally {
            if (client) {
                client.release()
            }
        }
    }
    async CheckLogin(req,res){
        const userId=req.userId
        let client
        try {
            client=await pool.connect()
            let photoInfo
            const userQuery=await client.query('SELECT * FROM users WHERE id=$1',[userId])
            if(photoCache.has(userId)){
                photoInfo=photoCache.get(userId)         
            }else{
                photoInfo=await client.query('SELECT * FROM photos WHERE user_id = $1',[userId])
                photoCache.set(userId,photoInfo)
            }
            const photoLink=photoInfo.rows[0].photo_link
            const nickname=userQuery.rows[0].nickname
            return res.json({success:true,link:photoLink,nickname:nickname})
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Ошибка на сервере' })
        }finally {
            if (client) {
                client.release()
            }
        }
    }
}

module.exports = new LoginController()