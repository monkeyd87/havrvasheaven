const router = require('express').Router()
const {Order,User,Produce} =require('../../modles')
const jwt = require('jsonwebtoken')
const auth  = require('../../auth/auth')

// getting all user
router.route('/')
.get(async(req,res)=>{
    try{
        const users = await User.find({}).populate('addresses')
        .select(['-password'])
        if(!users){
            res.status(404).json({message:'No users found'})
            
            return
        }
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:'server error'})
        console.log(err)
    }
})
// add user
.post(async(req,res)=>{
    try{
        const user = await User.create(req.body)
        if(!user){
            return res.status(404).json({message:'no user'})
        }

        const {_id,username} = user

        const token = jwt.sign({_id,username},'super-secret',{expiresIn:'1h'})
        res.status(200).json({token})

    }catch(err){
        res.status(500).json({message:"server error"})
        console.log(err)
    }

})
// get user by id
// router.use(auth)
router.route('/me')
.get(auth,async(req,res)=>{
    const {_id} = req.user
    try{
        const user = await User.findById(_id).select('-password').populate('addresses').populate('cart')
        if(!user){
            res.status(404).json({message:'no user found'})
            return
        }
        console.log(_id)
        res.json(user)
    }catch(err){
        console.log(err)
        res.json({message:'server err'})
    }

})
// delete user
.delete(async(req,res)=>{
    try{
        const data = await User.findOneAndDelete({_id:req.params.userid})
        if(!data){
            res.status(404).json({message:'user not found'})
        }
        res.status(200).json(data)

    }catch(err){
        res.status(500).json(message({message:'server error'}))
    }

})


// add produce to cart

router.route('/:userId/produce/:produceId')
.put(async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{cart:req.params.produceId}},
            {new:true})
            .populate('cart')
        if(!user){
            return res.status(400).json({message:'no user found'})
        }
        res.json(user)

    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }

})

// remove produce from  cart

router.route('/:userid/produce/:proudceid/remove')
.put(async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            {_id:req.params.userid},
            {$pull:{cart:req.params.proudceid}},
            {new:true})
            .populate('cart')
        if(!user){
           return res.status(400).json({message:'user not found'})
        }
        res.status(200).json(user)


    }catch(err){
        res.status(500).json({message:'sever error'})
    }

})


router.route('/:userid/address/add')
.post(async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            {_id:req.params.userid},
            {$push:{addresses:req.body.addresses}},
            {new:true})
            .populate('cart')
        
        if(!user){
            return res.status(200).json({message:'user not found'})
        }
        res.status(200).json(user)

    }catch(err){
        res.status(500).json({message:'server error'})
    }
})



module.exports = router
