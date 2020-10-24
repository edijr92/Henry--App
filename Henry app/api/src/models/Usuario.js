const {DataTypes} = require ("sequelize")

module.exports = (sequelize) => {
    const User = sequelize.define('usuario', {
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull : true,
        },
        apellido : {
            type: DataTypes.STRING,
            allowNull: true
        },
        rol : {
            type: DataTypes.ENUM ('alumno', 'instructor', 'pm', 'director'),
            
            allowNull: false,
        },
        password : {
        type: DataTypes.STRING,
        allowNull: true,
        },
        edad : {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        localidad : {
            type: DataTypes.STRING,
            allowNull: true
        },
        //proceso de carrera
        proceso: {
            type : DataTypes.INTEGER,
            defaultValues : 1,
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: true
        },
        providerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salt : {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValues: true
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: true,
        }
    })
}