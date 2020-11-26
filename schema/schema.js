const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('schema', AuthSchema);