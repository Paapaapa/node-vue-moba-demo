const express = require("express");

const app = express();

// 设置全局变量
app.set('secret', 'demo');

app.use(require('cors')());
app.use(express.json());
// 托管后，此时访问该文件夹下文件的路径为localhost:3000/web/css/xxx.css
app.use('/web', express.static(__dirname + '/web'));
app.use('/admin', express.static(__dirname + '/admin'));
app.use('/uploads', express.static(__dirname + '/uploads'));


require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/web')(app);

app.listen(3000, () => {
    console.log("listening at localhost:3000···");
});