const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('@core/http-exception')
const {secretKey} = require('@config').security

class Auth {
	constructor(level) {
		this.level = level || 1
		Auth.USER = 8
		Auth.ADMIN = 16
		Auth.SUPERADMIN = 32
	}

	/**
	 *
	 */
	get m() {
		return async (ctx, next) => {
			const userToken = basicAuth(ctx.req)
			let errMsg = 'token不合法'

			if (!userToken || !userToken.name) {
				throw new Forbbiden(errMsg)
			}

			try {
        // jwt.verify(token, secretOrPublicKey, [options, callback])
				var decode = jwt.verify(userToken.name, secretKey)
			} catch (error) {
				if (error.name == 'TokenExpiredError') {
					errMsg = 'token已过期'
				}
				throw new Forbbiden(errMsg)
			}

			if (decode.scope < this.level) {
				errMsg = '权限不足'
				throw new Forbbiden(errMsg)
			}

			ctx.auth = {
				uid: decode.uid,
				scope: decode.scope
			}

			await next()
		}
	}

	/**
	 * 使用jwt校验token
	 * @param {String} token 需要进行jwt校验的token
	 */
	static verifyToken(token) {
		try {
			jwt.verify(token,secretKey)
			return true
		} catch (error) {
			return error
		}
	}
}

module.exports = { Auth }
