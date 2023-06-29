
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')


const sellerSchema = new Schema(
  {
    
    username: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
      unique:true

    },
    img:{
      type:Buffer
    },
    password:{
      type:String,
      required:true
    },
    isSeller:{
      type:Boolean,
      default:true
    },
    location: {
      type: Schema.Types.ObjectId,
      ref:'Address'
    },
    garden_description: {
      type: String,
    },
    produce: [{
      type: Schema.Types.ObjectId,
      ref: 'Produce'
    }]
  }
  );


  sellerSchema.pre('save',async function(next){
    const salt  = 10
    if(this.isNew || this.isModified('password')){
       return this.password = await bcrypt.hash(this.password,salt)
      }
      next()
  })

  


  const Seller = model('Seller',sellerSchema)

  module.exports = Seller