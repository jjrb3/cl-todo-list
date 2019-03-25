
const express = require('express');

const Todo = require('../../models/to-do');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


app.get('/api/to-do', verifyToken, (req, res) => {

    Todo.find({ description: new RegExp(req.query.description) })
        .sort({ _id: -1 })
        .populate('user')
        .populate('status')
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Todo.count({ status: true }, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    todo: data
                });
            });
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


app.put('/api/to-do/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;


    Todo.findByIdAndDelete(id, (err, dataDelete) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }


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
});


app.delete('/api/to-do/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Todo.findByIdAndDelete(id, (err) => {

        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }

        res.json({
            success: true
        });
    });
});


module.exports = app;