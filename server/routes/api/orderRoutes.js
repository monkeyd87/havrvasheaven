const router = require('express').Router()
const {Order,User,Produce} =require('../../modles')


router.route('/')
.get(async(req,res)=>{
    try{
        const data = await Order.find({})
        if(!data) {return res.status(404).json({message:'no order found'})}
        res.status(200).json(data)

    }catch(err){

    }
})
// create order
.post( async (req, res) => {
    try {
      const { produce_id, user_id, quantity } = req.body;
  
      // Retrieve the produce
      const produce = await Produce.findById({_id:produce_id});
      if (!produce) {
        return res.status(404).json({ error: 'produce not found' });
      }
  
      // Check if the quantity is available
      if (quantity > produce.quantity) {
        return res.status(400).json({ error: 'Insufficient quantity available' });
      }
  
      // Create the order
      const order = await Order.create({ produce: produce_id, buyer: user_id, quantity });
  
      // Update the produce quantity
      produce.quantity -= quantity;
      await produce.save();
  
      return res.status(201).json({ order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router
