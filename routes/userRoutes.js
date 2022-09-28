const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const {userSeeder}=require("../seeders/usersSeeder")
const upload = require('../middlewares/upload')
const uploadController =require('../controllers/uploadController')

const router = express.Router()

//auth routes
router.post('/signIn',authController.signIn)
router.get('/logout',authController.logout)
router.get("/seeder",userSeeder)

//users Crud routes
router.get('/', userController.getAllUsers)
router.post('/', userController.addUser)
router.get('/:id', userController.editUser)
router.delete('/:id', userController.removeUser)
router.put('/:id', userController.updateUser)

//user routes follow and unfollow
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

//user avatar upload
router.patch('/upload', upload.single('avatar'), uploadController.uploadAvatar)

module.exports = router