const jwt = require('jsonwebtoken')

module.exports.checkUser = async (req, res, next) => {
  console.log(req.path);

  if (req.path === '/signIn') {
    console.log('loging request')
    return next()
  }
  const token = req?.cookies?.token  
  if (token) {
   try {  
      const verify = await jwt.verify(req?.cookies.token, process.env.JWT_SECRET)
      if (verify) {
        const { id } = jwt.decode(req?.cookies.token)
        res.locals.user_id = id
        req.user_id = id
        console.log('verified jwt')
      } else {
        res.locals.user_id=null
        res.cookies('token', null, { maxAge: 1 })
        console.log('not verify', res.locals)        
        return res.status(403).send('token invalide')
     }   
     next()
    } catch (error) {
        //res.locals.user_id=null
     console.log(error)
     return res.status(403).send('token invalide')
    }     
  }else{
    res.locals.user_id = null
    console.log('no token', res.locals)
    res.status(403).send('you must to authenticate')
  }
}