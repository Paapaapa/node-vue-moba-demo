module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams: true,
    });
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth');
    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource');

    // 新建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });

    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = "parent";
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100);
        res.send(items);
    });

    // 详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });

    // 编辑
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    // 删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
        });
    });

    app.use('/admin/api/rest/:resource', authMiddleware(app), resourceMiddleware(), router);

    // 文件上传
    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' });
    app.post('/admin/api/upload', authMiddleware(app), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        // 1.根据用户名找用户
        const AdminUser = require('../../models/AdminUser');
        const user = await AdminUser.findOne({ username }).select("+password");
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在',
        //     });
        // }
        assert(user, 422, '用户不存在');

        // 2.校验密码（明文比较）
         const isValid = require('bcrypt').compareSync(password, user.password);
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误',
        //     });
        // }
        assert(isValid, 422, '密码错误');

        // 3.返回token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'));
        res.send({ token,username:user.username });
    });

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message,
        });
    })
}