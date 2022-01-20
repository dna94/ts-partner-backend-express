const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    apiHeaders: {
        type: String,
        required: true
    },
    endpointSyncOrderUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        dafault: Date.now()
    }
    //Aggiungere poi il resto dei campi del SSO DTO Format
});

const User = mongoose.model('User', userSchema);
module.exports = User;