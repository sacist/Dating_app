const LoginController=require('../controllers/http/login')
const Router = require("express")
const router=new Router()
const verifyAccessToken=require('../middleware/http/access-token-verify')

router.post('/',LoginController.Login)

router.get('/check',verifyAccessToken,LoginController.CheckLogin)

module.exports=router