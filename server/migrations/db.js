
require('../config/config');

const mongoose = require('mongoose');


const {
     deleteUser
} = require('./user');


mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    deleteUser();
});

