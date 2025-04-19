const pool=require('../../../config/db')
const checkTypesError = require('../../check-types')
const checkStringLengthError = require('../../check-length')

const updateData =async (req,res)=>{
    const userId=req.userId
    const {status,description,dob,nickname}=req.body
    const hasError=checkTypesError([status,description,dob,nickname],'string')
    ||checkStringLengthError([status,dob],255)
    ||checkStringLengthError([nickname],15)
    ||checkStringLengthError([description],2047)
    
    if(hasError){
        return res.status(500).json({error:'Ошибка на сервере'})
    }
    let client
    try { 
        client=await pool.connect()
        const user = await client.query(`SELECT * FROM users WHERE id = $1`, [userId])
        if (user.rowCount===0) {
            return res.status(404).json({error:'Ошибка на сервере'})
        }
        await client.query(
            `UPDATE users SET status = $1, description = $2, dob = $3 WHERE id = $4`,[status, description, dob, userId]);
        const existingNicknameQuery=await client.query('SELECT * from users WHERE nickname ILIKE $1',[nickname])
        if(existingNicknameQuery.rows[0]){
            if(!(user.rows[0].nickname===existingNicknameQuery.rows[0].nickname)){     
                return res.status(409).json({error:'Никнейм занят'})
            }else{
                return res.status(200).json({success:'Данные обновлены'}) 
            }
        }
        await client.query('UPDATE users SET nickname = $1 WHERE id = $2',[nickname,userId])     
        return res.status(200).json({success:'Данные обновлены'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:'Ошибка на сервере'})       
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports={updateData}