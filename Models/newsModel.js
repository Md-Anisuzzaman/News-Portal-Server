const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const newsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: 'Array',
        required: false
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    published_at: {
        type: Date,
        default: new Date().toLocaleString(),
    }
},
    {
        timestamps: true,
        // versionKey: false
    },
);

const newsModel = mongoose.model('news', newsSchema);

module.exports = newsModel;

