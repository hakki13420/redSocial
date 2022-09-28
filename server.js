const express = require('express')
const userRoutes = require('./routes/userRoutes')
const seederRoutes = require('./routes/seederRoutes')
const postRoutes=require('./routes/postRoutes')
require('dotenv').config({ path: './config/.env' })
require('./config/db') //database connection setup
const cookieParser=require('cookie-parser')
const {checkUser}=require('./middlewares/checkUser')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//routes
app.use("/users", checkUser, userRoutes);
app.use('/posts',checkUser, postRoutes)
app.use('/seeder',seederRoutes)
app.get('*',checkUser)


const PORT= process.env.PORT||5000;

app.listen(PORT, () => {
    console.log('server running on the port :'+PORT)
})