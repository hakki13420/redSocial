const mongoose = require('mongoose')
const bcrypt=require('bcrypt') 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3,
        maxLength:15,
        unique:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        required: true,        
    },
    avatar: {
        type: String,
        default:"../uploads/default.png",
    },
    followers: {
        type:[String]
    },
    following: [String],
    likes:[String]
},
{
    timestamps:true,    
}
)

// crypthing the password with bcrypt extention
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log('pre save')
    next()
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User
