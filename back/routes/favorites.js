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



routerFavorites.post("/", async (req, res) => {
    console.log(req.body);
	try{
        const favoriteCreated = await Favorites.create(req.body);
        favoriteCreated.getOwner()
        .then(resp => resp.dataValues)
        .then(owner =>{
            const ownerData = {email: owner.email}
            const favorite = {...favoriteCreated, owner :ownerData}
            res.json(favorite)
        })

    }catch(err){
        console.error(err)
    }
	
});








module.exports = routerFavorites;