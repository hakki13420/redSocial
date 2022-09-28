const User = require('../models/User')
const dataUsers = [
  {
    name: "hakki rabah",
    email: "hakki@gmail.com",
    password: "admin",
  },
  {
    name: "soufiane",
    email: "soufiane@gmail.com",
    password: "admin",
  },
  {
    name: "youcef",
    email: "youcef@gmail.com",
    password: "admin",
  },
  {
    name: "yassine",
    email: "yassine@gmail.com",
    password: "admin",
  },
  {
    name: "widad",
    email: "widad@gmail.com",
    password: "admin",
  },
];
const deleteAllUsers = async() => {
    await User.deleteMany({});    
}

const createUsers = () => {
    dataUsers.forEach(async (item) => {
        await User.create(item)
    })        
}

module.exports.userSeeder = (req,res) => {
    console.log("seeder execution")
    deleteAllUsers();
    createUsers();    
    res.status(200).end('seeder user ok '+dataUsers.length+' users added')
}