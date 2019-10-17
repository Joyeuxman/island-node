const {Sequelize,Model,Op} = require('sequelize')
const {sequelize} = require('@core/db')
const {NotFound} = require('@core/http-exception')
const {Art} = require('@models/art')

class Favor extends Model {
  /**
   * 判断用户是否喜欢该作品
   * @param {*} art_id 
   * @param {*} type 
   * @param {*} uid 
   */
  static async userLikeIt(art_id,type,uid){
    const favor = await Favor.findOne({
      where:{
        uid,art_id,type
      }
    })
    return favor ? true:false
  }

  /**
   * 获取用户喜欢的期刊
   * 1.查询该用户所有喜欢期刊（不包括书籍类型）的集合
   * 2. 按照类型将集合中art_id进行分类
   * 3. 根据art_id集合和type进行查询
   * @param {String} uid 用户ID
   */
  static async getMyClassicFavors(uid){
    const favors = await Favor.findAll({
      where:{
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })
    if(!favors){
      throw new NotFound()
    }
    return await Art.getList(favors)
  }
}

Favor.init(
  {
    uid:{
      type: Sequelize.INTEGER,
      comment: '用户ID'
    },
    art_id:{
      type: Sequelize.INTEGER,
      comment: '作品ID'
    },
    type:{
      type: Sequelize.INTEGER,
      comment: '作品类型'
    },
  },
  {
    sequelize,
    tableName: 'favor'
  }
)

module.exports = {Favor}