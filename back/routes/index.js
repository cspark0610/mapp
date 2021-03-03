const express = require("express");
const router = express.Router();
const User = require("../models/User")
const passport = require("passport")
const routerFavorites = require("./favorites");
const routerUsers = require("./users");

router.use("/users",routerUsers);
router.use("/favorites",routerFavorites);


//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).send("No autorizado")
}
//ACA ESTOY PARADO AHORA EN /api ver el server.js

router.post("/register", (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next)
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log('req.user',req.user);
  const user = req.user
  res.status(200).json(user)
})


router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) req.logout()
  res.sendStatus(204)
});


// router.post('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

// router.get("/me", isLoggedIn, (req, res) => {
//   if (req.user) res.json(req.user)
// })

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;