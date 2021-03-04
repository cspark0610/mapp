const express = require('express')
const routerFavorites = express.Router();
const {User, Favorites} = require('../models/index')

// aca ya estoy parado en http://localhost:8080/api/favorites

//ruta para postear un favorito
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


//ruta pra borrar el favorito de un user en particular
routerFavorites.delete('/:id', async(req,res)=>{
  const { movieId } = req.body;
  const { id } = req.params;
  

  try{
    const userById = await User.findByPk(id)
    console.log(userById);
    const deletedFavorite = await Favorites.destroy({ where:{id:movieId} })
    const favoritesByUser = await userById.getFavorites(userById);
    res.send(favoritesByUser)

  }catch(err){
    console.error(err);
  }
})



module.exports = routerFavorites;