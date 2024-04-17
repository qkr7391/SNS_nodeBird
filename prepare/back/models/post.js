const DataTypes = require('sequelize');
const { Moder } = DataTypes;

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        //already have id
        content: {
            // type: DataTypes.STRING(140),
            type: DataTypes.TEXT,
            allowNull: false,
        },
        //PostId -> RetweetId
    }, {
        charset: 'utf8mb4', // can use Korean && emoji
        collate: 'utf8mb4_general_ci' // Korean, emoji save
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.belongsTo(db.Post, {as: 'Retweet'}); //retweet
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'}); //through -> change name of middle table
    };
    return Post;
}