const pool = require('../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookie = require('cookie')
const crypto = require('node:crypto')
const checkTypesError=require('../check-types')
const checkStringLengthError=require('../check-length')

const JWTREFRESH = process.env.JWT_REFRESH
const JWTKEY = process.env.JWT_KEY

class RegistrationController {
    async checkEmail(req, res) {
        const { email } = req.body
        if(checkTypesError([email],'string')){
            return res.status(500).json({ error: 'Ошибка на сервере' })
        }
        let client
        try {
            client = await pool.connect()
            const existingEmailQuery = await client.query(`SELECT * FROM users WHERE email = $1`, [email])

            if (existingEmailQuery.rowCount != 0) {
                return res.status(200).json({ error: 'Пользователь с такой почтой уже зарегестрирован' })
            }
            return res.json({ success: 'Новый пользователь' })
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Ошибка на сервере' })
        } finally {
            if (client) {
                client.release()
            }
        }
    }
    async registerNewUser(req, res) {
        const { email, name, gender, password, nickname } = req.body
        const hasError=checkTypesError([email,name,gender,password,nickname],'string')
            ||checkStringLengthError([password],30)
            ||checkStringLengthError([email],255)
            ||checkStringLengthError([name],15)
            ||checkStringLengthError([nickname],15)
            ||nickname.length<4
        if(hasError){
            return res.status(500).json({ error: 'Ошибка на сервере' })
        }
        let client
        try {
            client = await pool.connect()

            const existingNicknameQuery = await client.query(`SELECT * FROM users WHERE nickname ILIKE $1`, [nickname])

            if (existingNicknameQuery.rowCount != 0) {
                return res.status(200).json({ error: 'Никнейм занят' })
            }

            const existingEmailQuery = await client.query(`SELECT * FROM users WHERE email = LOWER($1)`, [email])

            if (existingEmailQuery.rowCount != 0) {
                return res.status(200).json({ error: 'Пользователь с такой почтой уже зарегестрирован' })
            }

            const hashedPwd = await bcrypt.hash(password, 10)

            const user = (await client.query(`INSERT INTO users (email, name, gender, password,nickname) VALUES (LOWER($1),$2,$3,$4,$5) RETURNING id`
                , [email, name, gender, hashedPwd, nickname]))

            const userId = user.rows[0].id

            await client.query(`INSERT INTO photos (user_id) VALUES ($1)`, [userId])

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

            return res.json({ success: 'Успешная регистрация' })
        } catch (e) {
            console.log(e);
            return res.json({ error: 'server error' })
        } finally {
            if (client) {
                client.release()
            }
        }
    }
}

module.exports = new RegistrationController()