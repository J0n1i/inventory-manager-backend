const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    barcode: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = mongoose.model('Item', itemSchema);