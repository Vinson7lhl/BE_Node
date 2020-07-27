const Koa = require ('koa')
const Router = require ('koa-router')

// 实例化Koa对象
const koa = new Koa()
const router = new Router();

// 配置路由
router.get('/', async ctx => {
    ctx.body = 'Hello koa'
})


koa.use(router.routes()).use(router.allowedMethods())
const PORT = process.env.PORT || 8080
koa.listen(PORT, () => {
    console.log(`server start form ${PORT}`)
})


