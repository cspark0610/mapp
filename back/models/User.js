const S = require("sequelize")
const db = require("../config/db")
const bcrypt = require("bcrypt")

class User extends S.Model {}

User.init({
    email: {
        type: S.STRING,
        allowNull: false,
        validate: { isEmail : true }
    },
    password: {
        type: S.STRING,
        allowNull: false,
        validate: { notEmpty :true }
    },
    salt: {
        type: S.STRING,
    }
}, { sequelize: db, modelName: "user" })

User.prototype.hash = function (password) {
    return bcrypt.hash(password, this.salt).then(passwordHash => User.password = passwordHash)
}

User.beforeCreate((user) => {
    return bcrypt
        .genSalt(16)
        .then((salt) => {
            user.salt = salt;
            return user.hash(user.password, user.salt);
        })
        .then((hash) => {
            user.password = hash;
        });
});

User.prototype.validPassword = function (password) {
    return this.password === this.hash(password)
}

module.exports = User