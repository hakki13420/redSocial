const mongoose = require('mongoose')

const postShema = mongoose.Schema({
  posterId: {
    type: String,
    required:true
  },
  content: {
    type: String,
    required: true,
    trim:true
  },
  picture: {
    type:String
  },
  likers: {
    type: [String],
    required:true
  },
  comment: {
    type: [
      {
        commenterId: String,
        commentText: String,
        createdAt: String,
        updatedAt:String
      }
    ]    
  }
},
  {
  timestamps:true
})

const Post = mongoose.model('Post', postShema, 'posts')
module.exports=Post