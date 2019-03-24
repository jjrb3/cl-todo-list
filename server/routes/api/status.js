
const express = require('express');

const Status = require('../../models/status');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();



app.get('/api/status', verifyToken, (req, res) => {

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
                    status: result
                });
            });
        });
});


module.exports = app;