const router = require('express').Router()
const mongoose =require('mongoose')
const jwt = require('jsonwebtoken')


router.use('/login',require('./login'))
router.use('/seller', require('./sellerRoutes'))
router.use('/produce', require('./produceRoutes'))
router.use('/user', require('./userRoutes'))
router.use('/order', require('./orderRoutes'))
router.use('/address',require('./addressRoutes'))

router.route('/collection')
.get(async(req,res)=>{
res.send('help')

})


module.exports = router
