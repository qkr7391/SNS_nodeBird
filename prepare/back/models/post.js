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
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.SetUser (from sequalizer)
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments (from sequalizer)
        db.Post.hasMany(db.Image); // post.addImages, post.getImages (from sequalizer)
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags (from sequalizer)
        db.Post.belongsTo(db.Post, {as: 'Retweet'}); //post.addRetweet (from sequalizer)
        //retweet
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'}); // post.addLikers, post.removeLikers (from sequalizer)
        //through -> change name of middle table
    };
    return Post;
}