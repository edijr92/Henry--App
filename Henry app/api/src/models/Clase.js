const {DataTypes} = require ("sequelize")
module.exports = (sequelize) => {
    const Clase = sequelize.define ('clase', {
        modulo : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clase : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}

