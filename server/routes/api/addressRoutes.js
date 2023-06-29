const router = require('express').Router()

const {Address} = require('../../modles')

// get all  address

router.route('/')
.get(async(req,res)=>{
    try{
        const address =  await Address.find({})
        if(!address)return res.status(400).json({message:'addres not found'})
        res.status(200).json(address)
    }catch(err){
        res.status(500).json({message:'server error'})
    }
})
// add address
.post(async(req,res)=>{
    try{
        const address = await Address.create(req.body)
        res.status(200).json(address)
    }catch(err){
        res.status(200).json({message:'server error'})
    }
})
// get address by id
router.route('/:id')
.get(async(req,res)=>{
    try{
        const address = await Address.findById({_id:req.params.id})
        if(!address) return res.status(400).json({message:'address not found'})
        res.status(200).json(address)
    }catch(err){
        res.status(500).json({message:'server error'})
    }
})

// delete address by id
.delete(async(req,res)=>{
    try{
        const address = await Address.findByIdAndDelete({_id:req.params.id},{new:true})
        if(!address)return res.status(400).json({message:'address not found'})
        res.status(200).json(address)
    
    }catch(err){
        res.status(500).json({message:'server error'})
    }
})
// change address by id

.put(async(req,res)=>{
    try{
        const address = await Address.findByIdAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true})
        if(!address) return res.status(400).json({message:'address not found'})
        res.status(200).json(address)


    }catch(err){
        res.status(500).json({message:'server error'})
    }

})



module.exports = router