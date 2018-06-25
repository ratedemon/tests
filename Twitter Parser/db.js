const Sequelize = require('sequelize');
const config = require('./config/db_config.js');

const db = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'postgres'
});

// db.sync({force: true})
db.sync()
    .then(() => {
        console.log('DB synced');
    });

module.exports = db;