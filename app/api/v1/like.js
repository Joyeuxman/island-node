const Router = require('koa-router')
const {Favor} = require('@models/favor')
const {Auth} = require('@middlewares/auth')
const {LikeValidator} = require('@validators')
const {Success} = require('@core/http-exception')

const router = new Router({
  prefix: '/v1/like'
})

// 点赞
router.post('/',new Auth().m,async ctx=>{
  const v = await new LikeValidator().validate(ctx,{id: 'art_id'})
  const art_id = v.get('body.art_id')
  const type = v.get('body.type')
  const uid = ctx.auth.uid
  await Favor.like(art_id,type,uid)
  throw new Success()
})


// 取消点赞
router.post('/cancel',new Auth().m,async ctx=>{
  const v = await new LikeValidator().validate(ctx,{id: 'art_id'})
  const art_id = v.get('body.art_id')
  const type = v.get('body.type')
  const uid = ctx.auth.uid
  await Favor.disLike(art_id,type,uid)
  throw new Success()
})

module.exports = router