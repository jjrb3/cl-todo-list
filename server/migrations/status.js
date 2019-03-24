
const Status = require('../models/status');


let migrationStatus = () => {
    Status.remove({}, (err) => {
        if (err) {
            console.log('Error deleting status');
        }

        console.log('Deleted');

        seed(transactions());
    });
};


let transactions = () => {
    return [
        {
            name: 'Open'
        },
        {
            name: 'In-Progress'
        },
        {
            name: 'Completed'
        },
        {
            name: 'Archived'
        }
    ]
};


let seed = (transactions) => {

    for (let transaction of transactions) {

        let status = new Status(transaction);

        status.save((err) => {

            if (err) {
                console.log('Error adding status', transaction);
            }

            console.log('Added status', transaction);
        });
    }
};


module.exports = {
    migrationStatus
};