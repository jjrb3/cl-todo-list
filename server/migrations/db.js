
require('../config/config');

const mongoose= require('mongoose');


const { migrationUser } = require('./user');
const { migrationStatus } = require('./status');


mongoose.connect(process.env.URLDB, (err) => {

    if (err) throw error;

    migrationUser();
    migrationStatus();
});

