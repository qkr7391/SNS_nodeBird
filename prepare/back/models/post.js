module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        //already have id
        content: {
            // type: DataTypes.STRING(140),
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // can use Korean && emoji
        collate: 'utf8mb4_general_ci' // Korean, emoji save
    });
    Post.associtate = (db) => {
    };
    return Post;
}