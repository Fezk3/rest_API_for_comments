const express = require('express');
const app = express();

// setting view engine to ejs
app.set('view engine', 'ejs'); // for templates -> npm i ejs -> templates go in views directory
// setting the public directory to serve static files (css, js, images)
app.use(express.static('public'));
// setting to tell express how to parse the body of the request POST
app.use(express.urlencoded({ extended: true }));
// setting to tell express to parse json
app.use(express.json());


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// rest routes

