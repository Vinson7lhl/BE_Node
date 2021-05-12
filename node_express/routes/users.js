const EXPRESS = require('express')
// 获取文件对象
const FS = require('fs')
// 获取路由
const ROUTER = EXPRESS.Router()

/* GET users listing. */
ROUTER.get('/user', function(req, res, next) {
  res.send('respond with a resource')
});

module.exports = ROUTER
