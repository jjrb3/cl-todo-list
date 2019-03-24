const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let userSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'The description is necessary']
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    status: {
        type: Schema.Types.ObjectId, ref: 'status'
    }
});


module.exports = mongoose.model('todo', userSchema);