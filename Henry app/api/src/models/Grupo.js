const {DataTypes} = require ("sequelize")
const moment = require("moment");
module.exports = (sequelize) => {
    const Grupo = sequelize.define('grupo', {
        nombre : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.DATE,
            get(){
                return moment.utc(this.getDataValue("fecha")).format("DD/MM/YYYY");
            }
        }
    })
}