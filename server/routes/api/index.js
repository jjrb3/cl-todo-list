
const express = require('express');

const app = express();

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./to-do'));
app.use(require('./status'));

module.exports = app;