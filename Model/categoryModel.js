const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    title: {
        required: true,
        type: 'string',
    },
    creator: {
        required: true,
        type: 'string',
    },

    writter: {
        required: true,
        type: 'string',
    },

    image: {
        required: true,
        type: 'string',
    },
    description: {
        required: true,
        type: 'string',
    },
    published_at: {
        required: Date,
        type: new Date().toLocaleString(),
    }
},
    {
        timestamps: true,
        versionKey: false
    },
);

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;

