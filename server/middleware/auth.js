

module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')

        const {id} = jwt.verify(token, req.app.get('secret'))
        console.log(id)

        assert(id, 401, '请先登录')

        req.user = await AdminUser.findById(id)
        console.log(req.user)

        assert(req.user, 401, '请先登录')

        await next()
    }
}
