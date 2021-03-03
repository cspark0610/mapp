const express = require('express')
const routerFavorites = express.Router();
const {User, Favorites} = require('../models/index')

// aca ya estoy parado en http://localhost:8080/api/favorites

routerFavorites.get("/", (req, res) => {
	Favorites.findAll({
		include: {
			model: User,
			as: "owner",
			attributes: ["email"],
		},
	}).then((favorites) => res.send(favorites));
});



routerFavorites.post("/", async(req, res) => {
    const { user ,title, movieId } = req.body;
    console.log(req.body);
    try{

    const userById = await User.findByPk(user)
    const favorite = await Favorites.create({title,movieId})
    //console.log(favorite);

    const favoriteWithOwner = await favorite.setOwner(userById)  
   
    res.send(favoriteWithOwner) 
      
    }catch(err){
        console.error(err)
    }	
});



routerFavorites.delete('/',async(req,res)=>{
    const {movieId , user} = req.body;
    console.log(req.body);

    try{
    const userById = await User.findByPk(user)
    const favoriteById = await Favorites.findByPk(movieId);
    const deletedFavorite = await userById.removeFavorites(favoriteById)      

   // console.log(deletedFavorite);

     //res.json(favoritesFromUser)  
    }catch(err){
      console.error(err)
    }
   
  })



module.exports = routerFavorites;