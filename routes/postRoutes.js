const express = require('express')
const postController = require('../controllers/postController')
const upload = require('../middlewares/upload')
const uploadController = require('../controllers/uploadController')

const router = express.Router()

router.get('/', postController.getAllPosts)
router.post('/', postController.createPost)
router.get('/:id', postController.editPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

//like unlike routes
router.patch('/like/:id', postController.likePost)
router.patch('/unlike/:id', postController.unlikePost)
//comments routes
router.patch('/comments/:id', postController.addCommentToPost)
router.patch('/comment/update/:id', postController.updateCommentPost)
router.delete("/comment/remove/:id", postController.removeCommentPost);

//upload roote
router.patch('/upload',upload.single('picture'),uploadController.uploadPicture )

module.exports=router