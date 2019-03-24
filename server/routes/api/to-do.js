
const express = require('express');

const Todo = require('../../models/to-do');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();



app.get('/api/to-do', verifyToken, (req, res) => {

    return res.json({
        test: 1
    });
});


app.post('/api/to-do', verifyToken, (req, res) => {

    let body = req.body;

    var data = {
        description: body.description,
        status: body.status
    };

    if (body.user) {
        data['user'] = body.user;
    }

    let todo = new Todo(data);

    todo.save((err, todoDB) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            user: todoDB
        });
    });
});

module.exports = app;