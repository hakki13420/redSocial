const multer = require('multer')


// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null,'../client/public/images/users')
//     },
//     filename: (req, file, callback) => {
//         const extention = file.originalname.split('.')[1];
//         const name = req.user_id
//         callback(null,name+"."+extention)
//     }
// })

//const upload = multer({ storage })

const upload = multer()

module.exports=upload