module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId: 1
        // PostId: 3
    }, {
        charset: 'utf8mb4', // can use Korean && emoji
        collate: 'utf8mb4_general_ci' // Korean, emoji save
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}