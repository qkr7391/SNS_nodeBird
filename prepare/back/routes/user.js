const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
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

module.exports = router;