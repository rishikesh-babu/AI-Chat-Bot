const express = require('express')
const { chatHandler } = require('../controllers/chatcontroller')
const router = express()

router.get('/chat', chatHandler)

const apiRouter = router 
module.exports = apiRouter