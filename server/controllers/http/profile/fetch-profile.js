const pool=require('../../../config/db')


const fetchProfile =async (req,res)=>{
    const userId=req.userId
    const {nickname}=req.params
    let client
    try { 
        client=await pool.connect()
        const myProfileQuery = await client.query(`SELECT email,name,nickname,dob,gender,status,description,online FROM users WHERE id = $1`, [userId])
        if (myProfileQuery.rowCount===0) {
            return res.json({error:'Пользователь не найден'})
        }   
        if(myProfileQuery.rows[0].nickname.toLowerCase()===nickname.toLowerCase()){
            const photoInfoQuery=await client.query('SELECT * FROM photos WHERE user_id = $1',[userId])
            const photoLink=photoInfoQuery.rows[0].photo_link
            return res.json({profile:myProfileQuery.rows[0],myProfile:true,photo:photoLink})
        }
        const profileQuery=await client.query('SELECT email,name,nickname,dob,gender,status,description,online,id FROM users WHERE nickname ILIKE $1',[nickname])
        if (profileQuery.rowCount===0) {
            return res.json({error:'Пользователь не найден'})
        }
        const photoInfoQuery=await client.query('SELECT * FROM photos WHERE user_id = $1',[profileQuery.rows[0].id])
        
        const photoLink=photoInfoQuery.rows[0].photo_link
        return res.json({profile:profileQuery.rows[0],myProfile:false,photo:photoLink})
    } catch (e) {
        console.log(e);
        return res.json({error:'Ошибка на сервере'})       
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports={fetchProfile}