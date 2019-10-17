const Router = require('koa-router')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')
const {Auth} = require('@middlewares/auth')
const {PositiveIntegerValidator,ClassicValidator} = require('@validators')
const {NotFound} = require('@core/http-exception')

const router = new Router({
  prefix: '/v1/classic'
})

//获取最新期刊
router.get('/latest',new Auth().m,async(ctx,next)=>{
  const flow = await Flow.findOne({
    order:[
      ['index','DESC']
    ]
  })

  const art = await Art.getData(flow.art_id, flow.type)

  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type,ctx.auth.uid)
  art.setDataValue('index',flow.index)
  art.setDataValue('like_status',likeLatest)
  console.log('art===',art)

  ctx.body = art.dataValues

})

// 获取下一期
router.get('/:index/next',new Auth().m,async(ctx,next)=>{
  const v = await new PositiveIntegerValidator().validate(ctx,{id:'index'})
  const index = v.get('path.index')

  const flow = await Flow.findOne({
    where:{
      index: index+1
    }
  })
  if(!flow){
    throw new NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)

  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type,ctx.auth.uid)
  art.setDataValue('index',flow.index)
  art.setDataValue('like_status',likeLatest)
  console.log('art===',art)

  ctx.body = art.dataValues
  
})

// 获取上一期
router.get('/:index/previous',new Auth().m,async(ctx,next)=>{
  const v = await new PositiveIntegerValidator().validate(ctx,{id:'index'})
  const index = v.get('path.index')

  const flow = await Flow.findOne({
    where:{
      index: index - 1
    }
  })
  if(!flow){
    throw new NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)

  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type,ctx.auth.uid)
  art.setDataValue('index',flow.index)
  art.setDataValue('like_status',likeLatest)
  console.log('art===',art)

  ctx.body = art.dataValues
})

// 获取期刊点赞情况
router.get('/:type/:id/favor',new Auth().m,async ctx=>{
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = +v.get('path.type')

  const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
  ctx.body = {
    fav_nums: artDetail.art.fav_nums,
    like_status:artDetail.like_status
  }
})

// 获取我喜欢的期刊
router.get('/favor',new Auth().m,async ctx=>{
  const uid = ctx.auth.uid
  const favor = await Favor.getMyClassicFavors(uid)
  ctx.body = favor
})

// 获取期刊详情
router.get('/:type/:id',new Auth().m,async ctx=>{
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = +v.get('path.type')

  const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
  const {art,like_status} = artDetail
  art.setDataValue('like_status',like_status)
  ctx.body = art.dataValues
})


module.exports = router