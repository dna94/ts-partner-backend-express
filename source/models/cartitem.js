const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({

    price: {
        type: Number,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        dafault: Date.now()
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;