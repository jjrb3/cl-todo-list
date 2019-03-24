
const express = require('express');

const User = require('../../models/user');
const Todo = require('../../models/to-do');
const Status = require('../../models/status');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();



app.get('/api/load-data-form', verifyToken, (req, res) => {

    Status.find({}, 'name')
        .exec((err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            Status.count({}, (err, count) => {

                return res.json({
                    success: true,
                    quantity: count,
                    result
                });
            });
        });
});


module.exports = app;