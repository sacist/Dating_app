const {updateData}=require('../controllers/http/profile/update-data')
const Router = require("express")
const router=new Router()
const upload=require('../config/multer')
const UploadPhotoController=require('../controllers/http/profile/upload-photo')
const verifyAccessToken=require('../middleware/http/access-token-verify')
const {fetchProfile}=require('../controllers/http/profile/fetch-profile')
const {findByNickname}=require('../controllers/http/profile/find-by-nickname')

router.post('/update-data',verifyAccessToken,updateData)

router.post('/upload-photo',upload.single('photo'),verifyAccessToken,UploadPhotoController.uploadPhoto)

router.get('/:nickname',verifyAccessToken,fetchProfile)

router.get('/find/:nickname',verifyAccessToken,findByNickname)

module.exports=router