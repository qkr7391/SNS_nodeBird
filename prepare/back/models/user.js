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
        collate: 'utf8_general_ci' // Korean save
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'});
     };
    return User;
}