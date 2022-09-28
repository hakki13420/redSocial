const mongoose = require('mongoose')


mongoose.connect(process.env.URL_CONN)
    .then(() => console.log("database connected"))
    .catch((err)=>console.log(err))
