const Router = require('koa-router')
const { TokenValidator ,NotEmptyValidator} = require('@validators')
const { LoginType } = require('@utils/enums')
const {WXManager} = require('@services/wx')
const {Auth} = require('@middlewares/auth')

const router = new Router({
	prefix: '/v1/token'
})

// 获取token
router.post('/', async ctx => {
	const v = await new TokenValidator().validate(ctx)
	let token
	switch (v.get('body.type')) {
		case LoginType.USER_EMAIL:
			token = await emailLogin(v.get('body.account'), v.get('body.secret'))
			break
		case LoginType.USER_MINI_PROGRAM:
			token = await WXManager.codeToToken(v.get('body.account'))
			break
		case LoginType.ADMIN_EMAIL:
			break
		default:
			throw new global.errs.ParameterException('没有相应的处理函数')
	}
	ctx.body = {
		token
	}
})

router.post('/verify',async (ctx)=>{
	const v = await new NotEmptyValidator().validate(ctx)
	const result = Auth.verifyToken(v.get('body.token'))
	ctx.body = {
		is_valid:result
	}
})

module.exports = router
