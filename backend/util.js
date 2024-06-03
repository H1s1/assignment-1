const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment', 'root', 'test123', {
      host: 'localhost',
      port: 3306,
      dialect:  'mysql'
    });

connectDataBase = async () => {
    try {
       await sequelize.authenticate();
       console.log('Connection has been established successfully.');
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
};


module.exports = {
    connectDataBase,
    sequelize,
}