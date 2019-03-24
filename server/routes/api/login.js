
const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const app = express();



app.post('/api/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) =>{

        if (err) {
            return res.status(500).json({
               success: false,
               err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User and password are not correct'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User and password are not correct'
                }
            });
        }


        let token = jwt.sign({
            dataUser: userDB
        }, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN});


        res.json({
            success: true,
            user: userDB,
            token
        });
    });
});


module.exports = app;