const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/api', (req, res) => {
    res.send('Hello, api');
})

app.get('/api/posts', (req, res) => {
    res.json([
        {id:1, content: 'hello1'},
        {id:2, content: 'hello2'},
        {id:3, content: 'hello3'},
    ]);
})

app.post('/api/post', (req, res) => {
    res.json({id : 1, content: 'hello1'});
})

app.delete('/api/post', (req, res) => {

})

app.listen(3065, () => {
    console.log('Server is listening on port 3065');
});
