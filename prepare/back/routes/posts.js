const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize');

//GET / posts
router.get('/', async (req, res, next) => {
    try{
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            where.id = {
              [Op.lt] : parseInt(req.query.lastId, 10)
                // get 10 ids which is smaller than lastId
            }
        }
        const posts = await Post.findAll({
            where,
            // limit&offset : Offsets and limits get messed up when events of additions or deletions occur during the loading process.
            limit: 10,
            // offset: 0, // 1~10
            // offset: 10, // 11~20
            // offset: 100, // 101~110
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ], // -From 'Newest posts'
            include:[{
                model: User,
                attributes: ['id', 'nickname'],
            },{
                model: Image,
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // Likers
                as: 'Likers',
                attributes: ['id'],
            },  {
                model: Post,
                as: 'Retweet',
                include : [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model : Image,
                }]
            }]
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch(error) {
        console.error(error);
        next(error);
    }

})

module.exports = router;