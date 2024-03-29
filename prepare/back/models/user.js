module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        //already have id
        email: {
            type : DataTypes.STRING(30),
            allowNull: false, //essential
            unique: true,
        },
        nickname:{
            type : DataTypes.STRING(30),
            allowNull: false, //essential
        },
        password: {
            type : DataTypes.STRING(100),
            allowNull: false, //essential
        },

    },{
        charset: 'utf8', // can use Korean
        collate: 'utf8_general_ci' // Koreancsave
    });
    User.associtate = (db) => {};
    return User;
}