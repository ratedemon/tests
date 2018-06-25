const Sequelize = require('sequelize');
const db = require('../db');

const Tweet = db.define('tweets', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: Sequelize.STRING,
        notNull: true,
        allowNull: false
    },
    user_name:{
        type: Sequelize.STRING,
        notNull: true,
        allowNull: false
    },
    user_avatar:{
        type: Sequelize.STRING,
        notNull: false,
        allowNull: true
    },
    tweet_url:{
        type: Sequelize.STRING,
        notNull: false,
        allowNull: true
    }
});


module.exports = Tweet;