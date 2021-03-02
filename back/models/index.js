const User =require("./User")
const Favorites =require("./Favorites")

//aca establezco las relaciones de tablas

User.hasMany(Favorites,{as:'favorites', foreignKey:'ownerId'})
Favorites.belongsTo(User,{as:'owner'})

module.exports = { User, Favorites };