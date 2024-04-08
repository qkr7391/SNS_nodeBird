const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {User} = require('../models');
const router = express.Router();


//POST /user/login
router.post('/login', (req, res, next) => {
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
            return res.status(200).json(user);
        })
    })(req, res, next);
});

//POST /user
router.post('/', async(req, res, next) => {
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

// router.post('/user/logout', (req, res, next) => {
//
// })

module.exports = router;