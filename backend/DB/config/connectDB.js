const Sequelize = require('sequelize');

const db = new Sequelize('edunourishtest', 'abdelrahmanaly_SQLLogin_1','d3m3b89yqy',{
    host: '155.254.244.41',
    dialect: 'mssql'
})
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:',err);
 });


module.exports = db;