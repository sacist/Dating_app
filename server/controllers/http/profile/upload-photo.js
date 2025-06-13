const pool=require('../../../config/db')
const path = require("path");
const fs = require("fs");
const {photoCache}=require('../../../caching')

class UploadPhotoController {
    static async uploadPhoto(req, res) {
        if (!req.file) {
            return res.status(400).json({ error:"Файл не загружен" });
        }
        const fileUrl = `/photos/${req.file.filename}`;
        let client
        const userId=req.userId
        photoCache.delete(userId)
        try {
            client=await pool.connect()

            const oldPhotoQuery=await client.query('SELECT * FROM photos WHERE user_id = $1',[userId])

            const oldPhotoLink=oldPhotoQuery.rows[0].photo_link

            if(oldPhotoLink&&oldPhotoLink!=='/photos/1739101625506-btx4ff.png'){
                const oldPhotoPath=path.join(__dirname,'../../..',oldPhotoLink)
                    if(fs.existsSync(oldPhotoPath)){
                        fs.rmSync(oldPhotoPath)
                    }       
            }

            await client.query('UPDATE photos SET photo_link = $1, date=NOW()  WHERE user_id = $2',[fileUrl,userId])
            return res.json({ success: true, url: fileUrl });
        } catch (e) {
           console.log(e);
           return res.status(500).json({error:'Ошибка на сервере'})
            
        }finally {
            if (client) {
                client.release();
            }
        }
    }
}

module.exports = UploadPhotoController;
