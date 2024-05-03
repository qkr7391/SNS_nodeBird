const express = require('express');
const router = express.Router();

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

//POST /post
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
            const post = await Post.create({
                content: req.body.content,
                UserId: req.user.id,
        })
        const fullPost = await Post.findOne({
            where : { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // comment writer
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User, // post writer
                attributes: ['id', 'nickname'],
            }, {
                model: User, // Likers
                as: 'Likers',
                attributes: ['id'],
            }]
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//DELETE /post
router.delete('/:postId', isLoggedIn, async(req, res, next) => {
    try{
        await Post.destroy({
            where : {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch(error){
        console.error(error);
        next(error);
    }
});


//POST
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post){
            return res.status(403).send('This post is not exist.')
        }

        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })

        const fullComment = await Comment.findOne({
            where : { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            // }, {
            //     model: Comment,
            //     include: [{
            //         model: User,
            //         attributes: ['id', 'nickname'],
            //     }],
            },]
            // include: [{
            //     model: User,
            //     attributes: ['id', 'nickname'],
            // }],
        })
        res.status(201).json(fullComment);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//PATCH /post/1/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.findOne(
            { where : { id : req.params.postId }});
        if (!post) {
            return res.status(403).send('Post does not exist.')
        }
        //sequalize
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id,
                        UserId: req.user.id });
    }catch(error){
        console.error(error);
        next(error);
    }
});

//DELETE /post/1/like
router.delete('/:postId/like', isLoggedIn, async(req, res, next) => {
    try{
        const post = await Post.findOne(
            { where : { id : req.params.postId }});
        if (!post) {
            return res.status(403).send('Post does not exist.')
        }
        //sequalize
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id,
            UserId: req.user.id });
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;