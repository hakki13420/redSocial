const User=require('../models/User')
const Post = require('../models/Post')
const {isValid} =require('mongoose').Types.ObjectId

module.exports.getAllPosts = async(req, res) => {
  try {
    const posts = await Post.find()
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json('error server')
  }
}

module.exports.createPost = async (req, res)=>{
  try {
    console.log('create post ')
    const postToAdd =  {posterId:req.user_id, content:req.body.content}
    //postToAdd.posterId=req.user_id
    const post = await Post.create(postToAdd)
    return res.status(201).json(post)
  } catch (error) {
    return res.status(500).json('error server')
  }
}

module.exports.editPost = async (req, res) => {
  try {
    const { id } = req.params
    if (!isValid(id)) return res.status(400).json("invalid id")
    const post = await Post.findById(id)
    if (post) return res.status(200).json(post)
    throw error
  } catch (error) {
    return res.status(500).json('error server')
  }
}

module.exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const postUpdated=req.body
    if (!isValid(id)) return res.status.json('invalid id')
    const post = await Post.findByIdAndUpdate(id, postUpdated)
    if (post) res.status(200).json(post)
    throw error
  } catch (error) {
    return res.status(500).json('error server')
  }

}

module.exports.deletePost = async (req, res) => {
 try {
    const id = req.params.id;
    if (!isValid(id)) return res.status(400).json("id invalid");
    const post = await Post.findByIdAndDelete(id)
   if (post) return res.status(200).json("post deleted with success");
   return res.status(400).json('invalid request')
 } catch (error) {
   return res.status(500).json('error server')
 }
  
}

//like unlike posts
module.exports.likePost = async (req,res) => {
  try {
    const { id } = req.params
    if (!isValid(id)) return res.status(400).json('invalid id')
    const post = await Post.findByIdAndUpdate(
      {_id:id},
      {$addToSet:{likers:req.user_id}}
    )
    if (post) {
      await User.findByIdAndUpdate({_id:req.user_id},
        {$addToSet:{likes:id}}
      )
      return res.status(200).json(post)
    }
    throw error
  } catch (error) {
    return res.status(500).json('error server '+error)
  }
}

module.exports.unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValid(id)) return res.status(400).json("invalid id");
    const post = await Post.findByIdAndUpdate({_id:id}, {
      $pull: { likers: req.user_id },
    });
    if (post) {
      await User.findByIdAndUpdate(req.user_id, { $pull: { likes: id } });
      return res.status(200).json(post);
    }
    throw error;
  } catch (error) {
    return res.status(500).json("error server " + error);
  }
};
//comments
module.exports.addCommentToPost = async (req, res) => {
  const commentToAdd = {
    commenterId: req.user_id,
    commentText: req.body.commentText,
    createdAt: new Date(),
    updatedAt:new Date(),
  }
  if (commentToAdd) {
    try {
      const { id } = req.params
      if (!isValid(id)) return res.status(400).json('invalid post id')
        const post = await Post.findByIdAndUpdate(
          {_id:id},
          {$addToSet:{comment:commentToAdd}},
        )
      if (post) return res.status(200).json(post)
    throw error;
    } catch (error) {
      return res.status(500).json('error server'+error)
    }  
  }else return res.status(400).json('data invalid')
  
}

module.exports.updateCommentPost = async (req, res) => {
  
    try {
      const { id } = req.params
      const {commentId}=req.body
      if (!isValid(id)) return res.status(400).json('invalid post id')
      const post = await Post.findById(
          {_id:id}          
      )
      if (!commentId) return res.status(400).json('bad request commentId required')
      
      //update comment
      const commentFiltred = post.comment.filter(comment => comment._id == commentId)
      commentFiltred[0].commentText = req.body.commentText      

      post.comment = [...commentFiltred]
      
      const postSaved=await post.save()

      if (postSaved) return res.status(200).json(postSaved)
    throw error;
    } catch (error) {
      return res.status(500).json('error server'+error)
    }    
  
}

module.exports.removeCommentPost =async (req, res) => {
    try {
      const { id } = req.params
      const {commentId}=req.body
      if (!isValid(id)) return res.status(400).json('invalid post id')
      const post = await Post.findById(
          {_id:id}          
      )
      if (!commentId) return res.status(400).json('bad request commentId required')
      
      //remove comment
      const commentFiltred = post.comment.filter(comment => comment._id != commentId)
      
      post.comment = [...commentFiltred]
      
      console.log('post comment :', post.comment)
      const postSaved=await post.save()

      if (postSaved) return res.status(200).json(postSaved)
    throw error;
    } catch (error) {
      return res.status(500).json('error server'+error)
    }    
}