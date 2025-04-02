const Router = require("express")
const router=new Router()
const registrationRouter=require('./registration')
const profileRouter=require('./profile')
const loginRouter=require('./login')

router.use('/registration',registrationRouter)

router.use('/profile',profileRouter)

router.use('/login',loginRouter)


module.exports=router