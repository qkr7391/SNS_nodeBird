const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');


try{
    fs.accessSync('uploads');
} catch(error) {
    console.log('Create uploads folder');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({ // save images to desktop for practicing
        destination(req, file, done){
            done(null, 'uploads');
        },
        filename(req, file, done) { //image.png
            const ext = path.extname(file.originalname); // (extract extension) (png)
            const basename = path.basename(file.originalname, ext) // image;

            done(null, basename + '_' + new Date().getTime()+ ext); // image12424t43643.png
        },
    }),
    limits: { fileSize : 20 * 1024 * 1024} // 20MB

});


//POST /post
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/ug);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags) {
            const result = await Promise.all(hashtags.map((tag) =>
                Hashtag.findOrCreate({
                    where: { content: tag.slice(1).toLowerCase() },
                })
            ));
            await post.addHashtags(result.map((v) => v[0]));
        }
            if (req.body.image) {
                if(Array.isArray(req.body.image)) { // more than two images [imageA.png, imageB.png]
                  const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                  await post.addImages(images);
                }
                else { // one image - image: image.png
                    const image = await Image.create({ src : req.body.image });
                    await post.addImages(image);
                }
            }
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


//POST /post/images
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

//GET /post/1
router.get('/:postId', async (req, res, next) => { // POST /post/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });

        if (!post){
            return res.status(404).send('This post is not exist.')
        }

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: User, // Likers
                as: 'Likers',
                attributes: ['id', 'nickname'],
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        });
        console.log('Full post:', fullPost);
        res.status(200).json(fullPost);
    }catch(error){
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

//POST /1/retweet
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include : [{
                model: Post,
                as: 'Retweet',
            }],
        });

        if (!post){
            return res.status(403).send('This post is not exist.')
        }
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
            //Prevent 'Retweeting your own posts || retweeting posts that have been retweeted by others'.
            return res.status(403).send('You can not retweet your own posts.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where : {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('A post you\'ve already Retweeted.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        })
        const retweetWithPrevPost = await Post.findOne({
            where : { id: retweet.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include : [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model : Image,
                }]
            },  {
                model : User,
                attributes: ['id', 'nickname'],
            }, {
                model : Comment,
                include : [{
                    model: User,
                    attributes: ['id', 'nickname'],
               }],
            }],
        })
        res.status(201).json(retweetWithPrevPost);
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



module.exports = router;