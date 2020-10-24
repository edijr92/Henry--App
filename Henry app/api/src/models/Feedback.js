const {DataTypes} = require ("sequelize")

module.exports = (sequelize) => {
    const Feedback = sequelize.define('feedback', {
        //feedback
            social_skills: {
            type : DataTypes.INTEGER,
            allowNull: false
        },
            tecnical_skills: {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        comentarios: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}