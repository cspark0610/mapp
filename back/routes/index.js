const express = require("express");
const routerUsers = express.Router();
const User = require("../models/User")
const passport = require("passport")


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).send("No autorizado")
}
//ACA ESTOY PARADO AHORA EN /api/users ver el server.js

routerUsers.post("/register", (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next)
})

routerUsers.post("/login", passport.authenticate("local"), (req, res) => {
  console.log('req.user',req.user);
  const user = req.user
  res.status(200).json(user)
})


routerUsers.post("/logout", (req, res) => {
  if (req.isAuthenticated()) req.logout()
  res.sendStatus(204)
});


// router.post('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

routerUsers.get('/users',(req,res)=>{
    User.findAll({})
    .then(users =>{
       res.json(users)
    })
    .catch(err => console.log(err))
});


routerUsers.get('/users/:id',(req,res)=>{
  User.findByPk(req.params.id)
  .then(user =>{
     res.json(user)
  })
  .catch(err => console.log(err))
})


routerUsers.delete('/users/:id',async(req,res)=>{
  try{
    const deletedUser= await User.destroy({where :{id:req.params.id}})
    const allUsers = await User.findAll({})
    res.json(allUsers)  
  }catch(err){
    console.error(err)
  }
 
})

routerUsers.get("/me", isLoggedIn, (req, res) => {
  if (req.user) res.json(req.user)
})

// Don´t modify this route, keep it at the bottom.
routerUsers.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = routerUsers;