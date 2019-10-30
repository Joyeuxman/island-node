const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('@core/db')

class Comment extends Model{
  static async addComment(book_id,content){
    const comment = await Comment.findOne({
      where:{
        book_id,
        content
      }
    })
    if(!comment){
      return await Comment.create({
        book_id,
        content,
        nums: 1
      })
    }else{
      return await comment.increment('nums',{
        by: 1
      })
    }
  }

  static async getComments(book_id){
    const comments = Comment.findAll({
      raw: true, // 设置为 true，即可返回源数据
      where: {
        book_id
      }
    })
    return comments
  }
}

Comment.prototype.exclude = ['book_id','id']

Comment.init(
  {
    content: {
      type: Sequelize.STRING(12),
      comment: '评论内容'
    },
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: '评论数量'
    },
    book_id: {
      type: Sequelize.INTEGER,
      comment: '关联书籍的ID'
    }
  },
  {
    sequelize,
    tableName:'comment'
  }
)

module.exports = {Comment}