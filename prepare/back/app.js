const express = require('express');

const app = express()
const postRouter = require('./routes/post');

const db = require('./models');

db.sequelize.sync()
    .then(()=>{
        console.log('db connect success');
    })
    .catch(console.error);

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
app.listen(3065, () => {
    console.log('Server is listening on port 3065');
});
