const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const maxAge = 3 * 24 * 60 * 60 * 1000;

class authController{

    static async signIn(req,res) {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(403).send('email wrong')
        
        const pm = await bcrypt.compare(req.body.password, user.password)         
        
        if (!pm){
            return res.status(403).send('password wrong')
        }
        const token= await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:maxAge})
        res.cookie("token",token,{httpOnly:true, maxAge})
        return res.status(200).send(token)        
    }

    static logout(req, res) {
      if (req.cookies.token) {
        req.cookies.token = null
        res.cookie('token',null,{maxAge:1})
        console.log('logout')
        return res.status(200).send('logout')      
      }
    }
    

}

module.exports=authController