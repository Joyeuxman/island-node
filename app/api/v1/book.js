const Router = require('koa-router')
const {HotBook} = require('@models/hot-book')
const {Book} = require('@models/book')
const {Favor} = require('@models/favor')
const {PositiveIntegerValidator,SearchValidator} = require('@validators')
const {Auth} = require('@middlewares/auth')

const router = new Router({
  prefix: '/v1/book'
})

// 热门书籍
router.get('/hot_list',async (ctx,next)=>{
  const books = await HotBook.getAll()
  ctx.body = books
})

// 获取书籍详情
router.get('/:id/detail',async (ctx,next)=>{
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book()
  ctx.body = await book.detail(v.get('path.id'))
})

// 搜索书籍
router.get('/search',async ctx=>{
  const v = await new SearchValidator().validate(ctx)
  const result = await Book.searchFromYuShu(
    v.get('query.q'),
    v.get('query.start'),
    v.get('query.count')
  )
  ctx.body = result
})

// 获取我喜欢书籍的数量
router.get('/favor/count',new Auth().m,async ctx =>{
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = {count}
  

})

// 获取书籍点赞情况
router.get('/:book_id/favor',new Auth().m,async ctx =>{
  const v = await new PositiveIntegerValidator().validate(ctx,{id:'book_id'})
  const favor = await Favor.getBookFavor(
    ctx.auth.uid,v.get('path.book_id')
  )
  ctx.body = favor
})
// 新增短评

// 获取书籍短评

module.exports = router