
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;


let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    status: {
        type: Boolean,
        default: true
    }
});


// No show password
userSchema.methods.toJSON = function() {

    let user = this,
        userObject = user.toObject();

    delete userObject.password;

    return userObject;
};


userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('user', userSchema);