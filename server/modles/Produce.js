const {schema,model, Schema} = require('mongoose')


const produceSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true,
        },
        quantity:{
            type:Number,
            required:true
        },
        seller:{
            type:Schema.Types.ObjectId,
            ref:"Seller"
        }
    }
)

const Produce = model('Produce',produceSchema)

module.exports = Produce

