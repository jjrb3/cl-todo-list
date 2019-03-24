const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let todoSchema = new Schema({
    description: {
        type: String,
        required: [true, 'The description is necessary']
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: false
    },
    status: {
        type: Schema.Types.ObjectId, ref: 'status'
    }
});


module.exports = mongoose.model('todo', todoSchema);