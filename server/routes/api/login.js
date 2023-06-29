const router = require('express').Router()
const {Order,User,Produce} =require('../../modles')
const jwt =require('jsonwebtoken')

router.route('/')
.post(async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        const correctPass = await user.isCorrectPassword(req.body.password)
        if(!correctPass){
            return res.json({message: 'incorrect password/email'})
        }
        const {_id,username} = user
        
        const token  = jwt.sign({_id,username},'super-secret',{expiresIn:'1h'})
        res.json({token})
        

        

    }catch(err){
        console.log(err)
        res.json({message:"server err"})
    }
})


module.exports = router