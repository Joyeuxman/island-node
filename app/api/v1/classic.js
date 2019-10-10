const Router = require('koa-router')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')
const {Auth} = require('@middlewares/auth')

const router = new Router({
  prefix: '/v1/classic'
})

//获取最新期刊
router.get('/latest',new Auth().m,async(ctx,next)=>{
  console.log('auth',ctx.auth)
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
router.get('/:index/next',async(ctx,next)=>{
  
})

// 获取上一期
router.get('/:index/previous',async(ctx,next)=>{
  
})

module.exports = router