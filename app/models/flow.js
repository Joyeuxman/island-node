const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('@core/db.js')

class Flow extends Model{

}

// Sequelize创建数据表的时候，如果没有指明主键字段，会自动创建 id 主键字段
Flow.init(
  {
    index: {
      type: Sequelize.INTEGER,
      comment: '作品按照事件最新排序字段'
    },
    art_id:{
      type: Sequelize.INTEGER,
      comment: '作品ID，与相对应类型作品的主键ID一一对应'
    },
    type:{
      type: Sequelize.INTEGER,
      comment: '作品类型'
    }
  },
  {
    sequelize,
    tableName: 'flow'
  }
  )

  module.exports = {Flow}