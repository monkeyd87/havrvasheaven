const {Schema, model} =require('mongoose')



const addressSchema = new Schema({
    street:{
        type: String,
        require: true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type: Number,
        required:true,
    },
    Country:{
        type:String
    }

})

const Address = model('Address',addressSchema)

module.exports = Address