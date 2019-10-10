const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require('@core/db')
const {AuthFailed} = require('@core/http-exception')

class User extends Model {
	/**
	 * 校验用户的邮箱、密码
	 * @param {String} email 邮箱
	 * @param {String} plainPassword 未加密的密码
	 */
	static async verifyEmailPasword(email, plainPassword) {
		const user = await User.findOne({
			where: {
				email
			}
		})
		if (!user) {
			throw new AuthFailed('账号不存在')
		}

		const { password } = user
		const correct = bcrypt.compareSync(plainPassword, password)
		if (!correct) {
			throw new AuthFailed('密码不正确')
		}

		return user
	}

	/**
	 * 根据openid查找用户
	 * @param {String} openid 小程序用户的openid
	 */
	static async getUserByOpenid(openid) {
		const user = await User.findOne({
			where: {
				openid
			}
		})
		return user
	}

	/**
	 * 根据openid注册用户
	 * @param {String} openid 小程序用户的openid
	 */
	static async registerByOpenid(openid) {
		const user = await User.create({ openid })
		return user
	}
}

// primaryKey 主键
// autoIncrement 自动增加
// unique 唯一
// set 设置器 使用bcrypt加密密码
User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '主键ID'
		},
		nickname: {
			type: Sequelize.STRING,
			comment: '昵称'
		},
		email: {
			type: Sequelize.STRING(128),
			unique: true,
			comment: '邮箱'
		},
		password: {
			type: Sequelize.STRING,
			set(val) {
				const salt = bcrypt.genSaltSync(10)
				const psw = bcrypt.hashSync(val, salt)
				this.setDataValue('password', psw)
			},
			comment: '密码'
		},
		openid: {
			type: Sequelize.STRING(64),
			unique: true,
			comment: '小程序用户的唯一标识'
		}
	},
	{
		sequelize,
		tableName: 'user'
	}
)

module.exports = { User }
