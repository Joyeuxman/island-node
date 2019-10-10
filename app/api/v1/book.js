const Router = require('koa-router')
const {HotBook} = require('@models/hot-book')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hotList',async (ctx,next)=>{
  const books = await HotBook.getAll()
  ctx.body = {
    name: 'ligh'
  }
})

router.get('/',async (ctx,next)=>{
  ctx.body = {
    name: 'test'
  }
})

module.exports = router