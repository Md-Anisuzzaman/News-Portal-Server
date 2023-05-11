const mongoose = require('mongoose');
const categoryNewsSchema = new mongoose.Schema({
    news_id: {
        type: mongoose.Types.ObjectId,
        ref: 'news'
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }
},
    {
        timestamps: true,
    },
);

const categoryNewsModel = mongoose.model('category_news', categoryNewsSchema);

module.exports = categoryNewsModel;

