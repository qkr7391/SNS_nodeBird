module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type : DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        charset: 'utf8mb4', // can use Korean && emoji
        collate: 'utf8mb4_general_ci' // Korean, emoji save
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}