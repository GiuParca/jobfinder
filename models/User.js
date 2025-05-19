const {Sequelize} = require("sequelize");
const db = require("../db/connection");

const User = db.define("users", {
   name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password_hash:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = User;