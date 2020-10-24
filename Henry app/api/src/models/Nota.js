const {DataTypes} = require ("sequelize")

module.exports = (sequelize) => {
    const Notas = sequelize.define('nota', {
        //nota
        nota : {
            type : DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min: 0,
                max: 10
            }
        },
        modulo:{
            type: DataTypes.ENUM("M1", "M2", "M3", "M4"),
            allowNull: false,
        }
    })
}