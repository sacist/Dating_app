const pool=require('../../../config/db')
const {photoCache}=require('../../../caching')

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
        let myPhoto   
        if(myProfileQuery.rows[0].nickname.toLowerCase()===nickname.toLowerCase()){
            if(photoCache.has(userId)){
                myPhoto=photoCache.get(userId)
            }else{
                myPhoto=await client.query('SELECT * FROM photos WHERE user_id = $1',[userId])
            }
            const photoLink=myPhoto.rows[0].photo_link
            return res.json({profile:myProfileQuery.rows[0],myProfile:true,photo:photoLink})
        }
        const profileUserId=await client.query(`SELECT id FROM users WHERE nickname ILIKE $1`,[nickname])
        if (profileUserId.rowCount===0) {
            return res.status(404).json({error:'Пользователь не найден'})
        }
        const profileUser=profileUserId.rows[0].id
        const profileQuery=await client.query('SELECT email,name,nickname,dob,gender,status,description,online,id FROM users WHERE id = $1',[profileUser])

        let photoInfo
        if(photoCache.has(profileUser)){
            photoInfo=photoCache.get(profileUser)   
        }else{
            photoInfo=await client.query('SELECT * FROM photos WHERE user_id = $1',[profileUser])
            photoCache.set(profileUser,photoInfo)  
        }
        
        const photoLink=photoInfo.rows[0].photo_link
        return res.json({profile:profileQuery.rows[0],myProfile:false,photo:photoLink})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:'Ошибка на сервере'})       
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports={fetchProfile}