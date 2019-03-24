
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../../models/user');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


app.get('/api/user', verifyToken, (req, res) => {

    let from = (req.query.from || 0),
        limit = req.query.limit || 5;


    User.find({ status: true }, 'name email status')
        .skip(Number(from))
        .limit(Number(limit))
        .exec((err, user) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            User.count({ status: true }, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    user

                });
            });
        });
});


app.post('/api/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });


    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            user: userDB
        });
    });
});


app.put('/api/user/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, {new: true}, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            user: userDB
        });
    });
});


app.delete('/api/user/:id', verifyToken, (req, res) => {

    let id = req.params.id;


    User.findByIdAndUpdate(id, {status: false}, {new: true}, (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        if (!userDelete) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User no found'
                }
            });
        }

        res.json({
            success: true,
            user: userDelete
        });
    });
});


module.exports = app;