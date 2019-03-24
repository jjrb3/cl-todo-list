
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//const { verificaToken } = require('../middlewares/autenticacion');

const app = express();


app.get('/user', (req, res) => {

    let desde = (req.query.desde || 0),
        limit = req.query.limite || 5;


    User.find({ status: true }, 'name email status')
        .skip(Number(desde))
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


app.post('/user', /*[verificaToken],*/ (req, res) => {

    let body = req.body;

    if (body.password === undefined) {
        return res.status(400).json({
            success: false,
            message: 'The password is required'
        });
    }

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


app.put('/user/:id', (req, res) => {

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


app.delete('/user/:id', (req, res) => {

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