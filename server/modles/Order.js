const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    
    produce: {
      type: Schema.Types.ObjectId,
      ref: 'Produce',
      required: true
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  });

const Order = model("Order",orderSchema)

module.exports = Order