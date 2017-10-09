/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'   // 定义所有路由的前缀都已 /weapp 开头
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/demo', controllers.demo.get)

router.get('/usr_address_select', controllers.usr_address.Select)
router.get('/usr_address_insert', controllers.usr_address.Insert)
router.get('/usr_address_update', controllers.usr_address.Update)
router.get('/usr_address_delete', controllers.usr_address.Delete)

module.exports = router
