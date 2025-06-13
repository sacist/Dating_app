const {fetchChats}=require('../controllers/http/chat/fetch-chats')
const Router = require("express")
const router=new Router()
const verifyAccessToken=require('../middleware/http/access-token-verify')
const {fetchChat}=require('../controllers/http/chat/fetch-chat')

router.get('/get-chats',verifyAccessToken,fetchChats)

router.get('/get-chat/:nickname',verifyAccessToken,fetchChat)

module.exports=router