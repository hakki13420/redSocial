const fs=require('fs')


const types = {
  "image/png":"png",
  "image/jpg":"jpg",
  "image/jpeg":"jpeg"
};
const extentions=Object.values(types)
console.log('ext', extentions)
//upload avatar picture
module.exports.uploadAvatar = (req, res) => {  
  console.log("file request ", req)
  if (extentions.includes(types[req.file.mimetype])) {    
    if (req.file.size > 2000000) {
      return res
        .status(400)
        .end("file over size please upload a file less 2 Mo");
    }
    const readingStream = fs.createReadStream(req.file.stream)
    const writingStream = fs.createWriteStream(
      "../client/public/images/users" +
        req.user_id +
        "." +
        types[req.file.mimetype]
    );
    
    readingStream.pipe(writingStream)
    readingStream.on('end',()=>res.status(201).end("avatar created with success"))
    
  } else {
    return res.status(400).end('invalid file format')
  }
}

//upload post picture
module.exports.uploadPicture = (req, res) => {
  console.log("file in the controller :", req.file);
};