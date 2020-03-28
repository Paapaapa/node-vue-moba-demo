module.exports = app => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
        useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open',  ()=> {
        console.log('connect database successfully!')
    });

    // A模型引用B模型，但是B模型未引用A模型会报错，所以在此先引用所有模型
    require('require-all')(__dirname+'/../models');
}