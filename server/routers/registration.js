const regController=require('../controllers/http/registration')
const Router = require("express")
const router=new Router()

router.post('/',regController.registerNewUser)
router.post('/check-email',regController.checkEmail)


module.exports=router