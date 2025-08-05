const express = require('express');
const { message } = require('../controllers/chatcontroller');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: Api')
});

router.get('/mesa', message) 

const apiRouter = router
module.exports = apiRouter;