const S = require("sequelize")
const db = require("../config/db")

class Favorites extends S.Model {}
Favorites.init(
    {
      title: {
        type: S.STRING,
        allowNull: false,
        validate:{notNull :true}
      },
      movieId: {
        type: S.STRING,
        allowNull: false,
        validate:{notNull :true}
      },  
    },
    { sequelize: db, modelName: "favorites" }
  );
  

module.exports = Favorites;