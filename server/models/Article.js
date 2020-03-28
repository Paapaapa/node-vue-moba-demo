const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
    }],
    body: {
        type: String
    },
},{
    // 插入数据时自动添加时间戳
    timestamps:true,
});

module.exports = mongoose.model('Article', schema);