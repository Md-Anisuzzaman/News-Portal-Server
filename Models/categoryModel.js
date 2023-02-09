const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    title: {
        type: 'string',
        required: true,
    },
    author: {
        type: 'string',
        required: true,
    },
    image: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    published_at: {
        type: Date,
        default: new Date().toLocaleString(),
    }
},
    {
        timestamps: true,
        versionKey: false
    },
);

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;

