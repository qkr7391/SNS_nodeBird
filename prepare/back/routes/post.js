const express = require('express');
const router = express.Router();

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

//POST /post
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
            const post = await Post.create({
                content: req.body.content,
                UserID: req.user.id,
        })
        res.status(201).json(post);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//DELETE /post
router.delete('/', (req, res) => {
res.json({id : 1});
})


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
            PostId: req.params.postId,
            UserId: req.user.id,
        })
        res.status(201).json(comment);
    }catch(error){
        console.error(error);
        next(error);
    }
});


module.exports = router;