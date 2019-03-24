
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Enable public folder
app.use(express.static(path.resolve(__dirname, '../public')));

// Express HBS engine
hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine','hbs');


app.use(require('./routes/api'));
app.use(require('./routes/web'));


mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    console.log('Database ONLINE');
});


app.listen(process.env.PORT, () => {
    console.log('Listen port: ', process.env.PORT);
});