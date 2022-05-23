const express = require('express');
const app = express();

// uuid para id de mensages
const { v4: uuid } = require('uuid');

// import method-override
const methodOverride = require('method-override');

// setting view engine to ejs
app.set('view engine', 'ejs'); // for templates -> npm i ejs -> templates go in views directory
// setting the public directory to serve static files (css, js, images)
app.use(express.static('public'));
// setting to tell express how to parse the body of the request POST
app.use(express.urlencoded({ extended: true }));
// setting to tell express to parse json
app.use(express.json());
//setting to use method-override
app.use(methodOverride('_method')); // for patch, delete, put on forms

// comments Data base simulation to perform CRUD operations
let comments = [
    {
        id: uuid(),
        name: 'John',
        comment: 'Hola'
    },
    {
        id: uuid(),
        name: 'Jane',
        comment: 'Buenas'
    },
    {
        id: uuid(),
        name: 'Jack',
        comment: 'Que tal?'
    },
    {
        id: uuid(),
        name: 'Jill',
        comment: 'Todo bien?'
    }
];


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// rest routes

//READ
app.get('/comments', (req, res) => {
    res.render('index', { comments: comments });
});

//CREATE
app.get('/comments/new', (req, res) => {
    res.render('new');
});

app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    comments.push({ name, comment, id: uuid() });
    res.redirect('/comments');
});

// show especific comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params; // destructuring the params object to get the id
    const comment = comments.find(c => c.id === id); // find the comment with the id
    res.render('show', { ...comment }); // render the show template with the comment
});

// UPDATE
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit', { ...comment });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newcomment = req.body.comment;
    const comment = comments.find(c => c.id === id);
    comment.comment = newcomment;
    res.redirect('/comments');
});

// DELETE
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});