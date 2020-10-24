const {DataTypes} = require ("sequelize");
const moment = require("moment");
module.exports = (sequelize) => {
    sequelize.define('cohorte', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
            unique:false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return "web_ft" +this.getDataValue("id");
            }
        },
        fecha : {
            type: DataTypes.DATE,
            allowNull: false,
            get(){
				return moment.utc(this.getDataValue("fecha")).format("DD/MM/YYYY");
            }
        },
    })
}