const {DataTypes} = require ("sequelize")

module.exports = (sequelize) => {
    const Pair = sequelize.define('pair', {
        alumnos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}

