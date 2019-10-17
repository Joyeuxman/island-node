const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('@core/db')
const { NotFound, LikeError,DisLikeError } = require('@core/http-exception')
const { Art } = require('@models/art')

class Favor extends Model {
	/**
	 * 判断用户是否喜欢该作品
	 * @param {*} art_id
	 * @param {*} type
	 * @param {*} uid
	 */
	static async userLikeIt(art_id, type, uid) {
		const favor = await Favor.findOne({
			where: {
				uid,
				art_id,
				type
			}
		})
		return favor ? true : false
	}

	/**
	 * 获取用户喜欢的期刊
	 * 1.查询该用户所有喜欢期刊（不包括书籍类型）的集合
	 * 2. 按照类型将集合中art_id进行分类
	 * 3. 根据art_id集合和type进行查询
	 * @param {String} uid 用户ID
	 */
	static async getMyClassicFavors(uid) {
		const favors = await Favor.findAll({
			where: {
				uid,
				type: {
					[Op.not]: 400
				}
			}
		})
		if (!favors) {
			throw new NotFound()
		}
		return await Art.getList(favors)
	}

	/**
	 * 点赞
	 * 根据art_id,type,uid在favor表中新增一条数据
	 * @param {*} art_id
	 * @param {*} type
	 * @param {*} uid
	 */
	static async like(art_id, type, uid) {
		const favor = await Favor.findOne({
			where: {
				art_id,
				type,
				uid
			}
		})
		if (favor) {
			throw new LikeError()
		}
		// transaction 事务机制 可以保证以下两个操作可以同时成功或者同时失败
		// 1. favor实体表插入一行数据
		// 2. 相应的期刊的喜欢人数加1
		return sequelize.transaction(async t => {
			await Favor.create(
				{
					art_id,
					type,
					uid
				},
				{ transaction: t }
			)
			const art = await Art.getData(art_id, type, false)
			await art.increment('fav_nums', {
				by: 1,
				transaction: t
			})
		})
	}

	/**
	 * 取消点赞
	 * 根据art_id,type,uid在favor表中删除一条数据（物理删除）
	 * @param {*} art_id
	 * @param {*} type
	 * @param {*} uid
	 */
	static async disLike(art_id, type, uid) {
		const favor = await Favor.findOne({
			where: {
				art_id,
				type,
				uid
			}
		})
		if (!favor) {
			throw new DisLikeError()
		}
		// transaction 事务机制 可以保证以下两个操作可以同时成功或者同时失败
		// 1. favor实体表插入一行数据
		// 2. 相应的期刊的喜欢人数加1
		return sequelize.transaction(async t => {
			await favor.destroy({
				force: true,
				transaction: t
			})
			const art = await Art.getData(art_id, type, false)
			await art.decrement('fav_nums', {
				by: 1,
				transaction: t
			})
		})
	}
}

Favor.init(
	{
		uid: {
			type: Sequelize.INTEGER,
			comment: '用户ID'
		},
		art_id: {
			type: Sequelize.INTEGER,
			comment: '作品ID'
		},
		type: {
			type: Sequelize.INTEGER,
			comment: '作品类型'
		}
	},
	{
		sequelize,
		tableName: 'favor'
	}
)

module.exports = { Favor }
