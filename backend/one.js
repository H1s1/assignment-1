const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('assignment', 'root', 'test123', {
    host: 'localhost',
    port: 3306,
    dialect:  'mysql'
  });

const Student = sequelize.define('Student', {
    Sno:{
        type:DataTypes.INTEGER,
        primaryKey : true,
        allowNull: false
    },
    RollNum:{
        type:DataTypes.INTEGER,
        primaryKey : false,
        allowNull: true
    },
    Name:{
        type:DataTypes.STRING(50),
        allowNull:true,
        primaryKey:false
    },
    Marks :{
        type:DataTypes.INTEGER,
        primaryKey:false,
        allowNull:false
    },
}, { timestamps:false,  tableName: 'one'})

module.exports = {Student};
console.log(Student === sequelize.models.Student);