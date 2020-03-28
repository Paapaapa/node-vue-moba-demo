module.exports = (app,options) => {
    const AdminUser = require('../models/AdminUser');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请提供jwt token');
        const { id } = jwt.verify(token, app.get('secret'));
        assert(id, 401, '无效的jwt token');
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, '请先登录');
        await next();
    };
}