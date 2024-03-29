module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        content: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        charset: 'utf8mb4', // can use Korean && emoji
        collate: 'utf8mb4_general_ci' // Korean, emoji save
    });
    Hashtag.associtate = (db) => {
    };
    return Hashtag;
}