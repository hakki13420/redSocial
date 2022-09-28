const express = require('express')
const {userSeeder}= require('../seeders/usersSeeder')

const router = express.Router()

//seeder routes
router.get('/users', userSeeder)

module.exports=router