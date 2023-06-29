const router = require('express').Router()
const {Seller,Produce} =require('../../modles')

// get all produce

router.route('/')
.get(async(req,res)=>{
    try{
        const produces = await Produce.find({}).populate('seller')
        if(!produces){
            return res.status(400).json({messgae:'produce not found'})
        }
        res.status(200).json(produces)

    }catch(err){
        console.log(err)
        res.status(500).json({message:'server error'})
    }
})
// add produce
.post(async(req,res)=>{
    try{
        const produce = await Produce.create(req.body)
        if(!produce){
            return res.status(400).json({message:'something went wrong'})
        }
        res.status(200).json(produce)

    }catch (err){
        res.status(500).json({message:"server error"})
    }
})
// find produce by id
router.route('/:produce_id')
.get(async(req,res)=>{
    try{
        const produce = await Produce.findById({_id:req.params.produce_id})
        if(!produce){
            return res.status(400).json({message:'produce not found'})
        }
    }catch(err){
        res.status(500).json({message:'server error'})
        console.log(err)
    }
})
// find by id and delete
.delete((req,res)=>{
    try{
        const produce = Produce.findByIdAndDelete({_id: req.params.produce_id})
        if(!produce){
            return res.status(400).json({message:'produce not found'})
        }
        res.status(200).json(produce)
        

    }catch(err){
        res.status(500).json({message:'server error'})
    }
})

module.exports = router
