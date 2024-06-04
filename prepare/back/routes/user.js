const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

//GET /user
router.get('/', async (req, res, next) => {
   console.log(req.headers);
    try {
        if(req.user) {
            const fullUserWithoutPW = await User.findOne({
                where: { id : req.user.id },
                //attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: ['password']
                },
                include:[{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(201).json(fullUserWithoutPW);
        }
        else {
            res.status(201).json(null);
        }

    } catch(error) {
        console.error(error);
        next(error);
    }
});

//GET /user/1
router.get('/:userId', async (req, res, next) => {
    try {
            const fullUserWithoutPW = await User.findOne({
                where: { id : req.params.userId },
                //attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: ['password']
                },
                include:[{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
        if(fullUserWithoutPW){
            //Prevent privacy exposure/breach
            const data = fullUserWithoutPW.toJSON();
            data.Posts = data.Posts.length;
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;
            res.status(200).json(data);
        }
        else {
            res.status(404).json('User does not exist.');
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
    try {
        const where = { UserId: req.params.userId };
        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }],
            }, {
                model: User, // 좋아요 누른 사람
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
                }]
            }],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



//POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info) {
            console.error(info);
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPW = await User.findOne({
                where: { id : user.id },
                //attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: ['password']
                },
                include:[{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(201).json(fullUserWithoutPW);
        })
    })(req, res, next);
});

//POST /user
router.post('/', isNotLoggedIn, async(req, res, next) => {
   try{
       //email duplicate check
      const exUser =  await User.findOne({
           where:{
               email: req.body.email,
           }
       });
      if(exUser){
          return res.status(403).send('This email is already used.');
      }

       const hashedPassword = await bcrypt.hash(req.body.password, 12); //Encrypted password
       await User.create({ //await -> for order
           email: req.body.email,
           nickname: req.body.nickname,
           password: hashedPassword,
       });
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060');
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.status(201).send('OK');
   } catch(error) {
        console.error(error);
        next(error);
   }
})

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout(() => {
        res.send('ok');
    })
})

//Change nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname, // change nickname what I got from user
        }, {
            where: { id: req.user.id } //condition: my ID
        });
        res.status(200).json( { nickname: req.body.nickname });
    } catch(error) {
        console.error(error);
        next(error);
    }
})


//Follow
//PATCH /user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where : { id: req.params.userId }
        });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json( { UserId: parseInt(req.params.userId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
})


//UnFollow
//DELETE /user/1/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where : { id: req.params.userId }
        });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json( { UserId: parseInt(req.params.userId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
})

//Remove Follower
//DELETE /user/followers/1
router.delete('/followers/:userId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId } // find myself
        });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        await user.removeFollowings(req.user.id); // 변경된 부분: req.user.id -> req.params.userId
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// Followers list
router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id } // Find myself
        });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers ); // Return followers as an object
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Followings list
router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id } // Find myself
        });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const followings = await user.getFollowings();

        res.status(203).json(followings); // Return followings as an object
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;