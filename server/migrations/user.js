
const User = require('../models/user');
const bcrypt = require('bcrypt');


let migrationUser = () => {
    User.remove({}, (err) => {
        if (err) {
            console.log('Error deleting users');
        }

        console.log('Deleted');

        seed(transactions());
    });
};


let transactions = () => {
    return [
        {
            name: 'Test Condors Labs',
            email: 'test@condors.co',
            password: bcrypt.hashSync('C0nd0rs', 10)
        },
        {
            name: 'Jeremy Reyes B.',
            email: 'jjrb6@hotmail.com',
            password: bcrypt.hashSync('123', 10)
        }
    ]
};


let seed = (transactions) => {

    for (let transaction of transactions) {

        let user = new User(transaction);

        user.save((err) => {

            if (err) {
                console.log('Error adding user', transaction);
            }

            console.log('Added users', transaction);
        });
    }
};


module.exports = {
    migrationUser
};