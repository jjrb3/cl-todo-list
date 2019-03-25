
const Todo = require('../models/to-do');


let migrationTodo = () => {
    Todo.remove({}, (err) => {
        if (err) {
            console.log('Error deleting status');
        }

        console.log('Deleted');
    });
};


module.exports = {
    migrationTodo
};