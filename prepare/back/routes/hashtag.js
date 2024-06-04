const express = require('express');
const { Op } = require('sequelize');

const { Post, Hashtag, Image, Comment, User } = require('../models');

const router = express.Router();

//Get /hashtag
router.get('/:hashtag', async (req, res, next) => {
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // Not initial load
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Hashtag,
                where: { content: decodeURIComponent(req.params.hashtag) },
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }],
            }],
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: error.message });
        next(error);
    }
});


module.exports = router;