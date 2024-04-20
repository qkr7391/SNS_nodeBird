const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');


//GET / posts
router.get('/', async (req, res, next) => {
    try{
        const posts = await Post.findAll({
            // where: { UserId: 1 },
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
                },]
            },],

        });
        console.log(posts);
        res.status(200).json(posts);
    } catch(error) {
        console.error(error);
        next(error);
    }

})

module.exports = router;