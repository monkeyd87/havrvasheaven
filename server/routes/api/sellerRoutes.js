const router = require('express').Router()
const {Seller,Produce} = require('../../modles')
const auth = require('../../auth/auth')


// get all seller
router.route('/')
.get(async(req,res)=>{
    try{
        const sellers = await Seller.find({}).populate('produce')
        if(!sellers){ return res.status(404).json({message:'sellers not found'})}
        res.json(sellers)

    }catch(err){
        res.status(500).json({message:'server error'})
        console.log(err)
    }
})
// add seller
.post(async(req, res)=>{
    try{
        const seller = await Seller.create(req.body)
        
        res.status(200).json(seller)

    }catch(err){
        console.log(err)
        res.status(500).json({message:'error'})
    }

})

// get sellers by id
router.route('/me')
.get(auth,async(req,res)=>{
    try{
        const seller = await Seller.findById(req.user._id).populate('produce')
        
        if(!seller){
            return res.status(404).json({message:'seller not found'})
        }
        res.status(200).json(seller)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'sever error'})
    }
    
})
//  delete seller by id
.delete(async(req,res)=>{
    try{
        const seller = await Seller.findByIdAndDelete({_id:req.params.seller_id})
        if(!seller){
            return res.status(404).json({message:'seller not found'})
        }
        res.status(200).json(seller)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'sever error'})
    }
})

.put(async(req,res)=>{
    const seller = await Seller.findById({_id:req.params.seller_id})
    if(!seller) return res.status(404).json({message:'seller not found'})
    seller.password = req.body.password
    await seller.save()
    res.status(200).json(seller)
})
// add produce to seller
router.route('/:sellerId/addproduce')
.post(async(req,res)=>{
    const produce = await Produce.create({...req.body,seller:req.params.sellerId})

    try{
        const seller = await Seller.findByIdAndUpdate(
            {_id:req.params.sellerId},
            {$addToSet:{produce:produce._id}},
            {new:true}
         ).populate('produce')
        if(!seller){
            return res.status(404).json({messge:'seller not found'})

        }res.status(200).json(seller)
        

    }catch(err){
        console.log(err)
        res.status(500).res({messge:'server error'})
    }
})


module.exports = router
