const express = require("express");
const routerUsers = express.Router();
const User = require("../models/User")
const Favorites = require("../models/Favorites")

//ACA ESTOY PARADO AHORA EN /api/users ver el server.js

routerUsers.get('/',(req,res)=>{
    User.findAll({})
    .then(users =>{
       res.json(users)
    })
    .catch(err => console.log(err))
});


routerUsers.get('/:id',(req,res)=>{
  User.findByPk(req.params.id)
  .then(user =>{
     res.json(user)
  })
  .catch(err => console.log(err))
})


routerUsers.delete('/:id',async(req,res)=>{
  try{
    const deletedUser= await User.destroy({where :{id:req.params.id}})
    const allUsers = await User.findAll({})
    res.json(allUsers)  
  }catch(err){
    console.error(err)
  }
 
})

module.exports = routerUsers;