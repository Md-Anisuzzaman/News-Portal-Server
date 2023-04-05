const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
},
    {
        timestamps: true,
    },
);

const authorModel = mongoose.model('author', authorSchema);

module.exports = authorModel;

