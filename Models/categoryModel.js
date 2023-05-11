const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    title: {
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

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;

