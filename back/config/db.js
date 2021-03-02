const Sequelize = require("sequelize")

const db = new Sequelize("postgres://localhost:5432/omdb", {
    loggin: false,
    dialect: "postgres"
})

module.exports = db