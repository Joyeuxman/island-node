const axios = require('axios')
const util = require('util')
const { Sequelize, Model} = require('sequelize')
const { sequelize } = require('@root/core/db.js')
const { Favor } = require('@models/favor')


class Book extends Model {
  async detail(id){
    const url = util.format(global.config.yushu.detailUrl,id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async getMyFavorBookCount(uid){
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }

  static async searchFromYuShu(q,start,count,summary =1){
    const url = util.format(global.config.yushu.keywordUrl,encodeURI(q),count,start,summary)
    const result = await axios.get(url)
    return result.data
  }
}

Book.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			comment: '主键ID'
		},
		fav_nums: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			comment: '喜欢的人数'
		}
	},
	{
		sequelize,
		tableName: 'book'
	}
)

module.exports = {Book}