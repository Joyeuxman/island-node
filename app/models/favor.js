const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('@core/db')

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