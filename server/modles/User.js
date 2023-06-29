
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true

        },
        email:{
            type:String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']

        },
        password:{
            type:String,
            required:true,

        },
        addresses:[
            {
                type: Schema.Types.ObjectId,
                ref:'Address'
            }
        ],
        
        orders:[
            {
                type:Schema.Types.ObjectId,
                ref:'Order'
            }
        ],
        cart:[
            {
                type:Schema.Types.ObjectId,
                ref:'Produce'
            }
        ]

            

        
    }
)

userSchema.pre('save',async function(next){
    const salt = 10
    if(this.isNew || this.isModified('password')){
        return this.password = await  bcrypt.hash(this.password,salt)
    }
    next()
    
})

userSchema.methods.isCorrectPassword = async function(password){
    
    return bcrypt.compare(password,this.password)
    
}

const User = model('User',userSchema)

module.exports = User
