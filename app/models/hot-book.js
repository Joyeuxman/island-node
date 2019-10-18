const {Sequelize,Model,Op} = require('sequelize')
const {sequelize} = require('@root/core/db.js')
const {Favor} = require('@models/favor')

class HotBook extends Model{
  static async getAll(){
    const books = await HotBook.findAll({
      raw: true, // 设置为 true，即可返回源数据
      order: ['index']
    })
    const ids =  books.map(book=> {
      console.log('111',book.id)
      return book.id
    })
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        },
        type: 400
      },
      group:['art_id'],
      attributes:[
        'art_id',
        [Sequelize.fn('COUNT','*'),'count']
      ]
    })
    console.log('in hot-book,favors===',favors)
    books.forEach(book=>{
      HotBook._getEachBooksStatus(book,favors)
    })

    return books
  }

  static async _getEachBooksStatus(book,favors){
    let count  = 0
    favors.forEach(favor =>{
      if(book.id === favor.art_id){
        count = favor.get('count')
      }
    })
    book.fav_nums=count
    return book
  }
}

HotBook.init({
  index: {
    type: Sequelize.INTEGER,
    comment: '书籍索引'
  },
  image: {
    type: Sequelize.STRING,
    comment: '书籍封面图片'
  },
  author: {
    type: Sequelize.STRING,
    comment: '书籍作者'
  },
  title: {
    type: Sequelize.STRING,
    comment: '书籍名称'
  }
},{
  sequelize,
  tableName:'hot_book'
})

module.exports = {HotBook}