const express = require('express')
const routerFavorites = express.Router();
const {User, Favorites} = require('../models/index')

// aca ya estoy parado en http://localhost:8080/api/favorites


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



routerFavorites.delete('/:id', async(req,res)=>{
  const { movieId, user } = req.body;
  try{
    const userById = await User.findByPk(user)
    //const deletedFavorite = await Favorites.destroy({ where:{id:movieId} })
    const favoritesByUser = await userById.getFavorites(userById);
    res.send(favoritesByUser)

  }catch(err){
    console.error(err);
  }
})



module.exports = routerFavorites;