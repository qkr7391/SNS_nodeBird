const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const db = require('./models');

const passportConfig = require('./passport');

dotenv.config();

db.sequelize.sync()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

passportConfig();

app.use(cors({
    origin: '*', // Allow every browser.
    credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('Hello, api');
})

app.get('/posts', (req, res) => {
    res.json([
        {id:1, content: 'hello1'},
        {id:2, content: 'hello2'},
        {id:3, content: 'hello3'},
    ]);
})

app.use('/post', postRouter);
app.use('/user', userRouter);
app.listen(3065, () => {
    console.log('Server is listening on port 3065');
});
