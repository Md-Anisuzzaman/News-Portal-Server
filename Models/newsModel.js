const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    // category: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'category'
    // },
    image: {
        type: 'Array',
        required: false
    },
    description: {
        type: String,
        required: true
    },
    // slug: {
    //     type: String,
    //     required: false
    // },
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

