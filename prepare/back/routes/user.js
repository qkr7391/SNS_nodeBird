const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();


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
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPW);
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

// router.post('/logout', isLoggedIn, (req, res) => {
//     req.logout();
//     req.session.destroy();
//     res.send('ok');
// })

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout(() => {
        res.send('ok');
    })
})
module.exports = router;