
require('./config/config');

const express = require('express');
//const mongoose = require('mongoose');
//const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));


app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    console.log('Base de datos ONLINE');
});
*/

app.post('/', (req, res) => {

    let body = req.body;

   res.json(body);
});


app.listen(process.env.PORT, () => {
    console.log('Listen port: ', process.env.PORT);
});