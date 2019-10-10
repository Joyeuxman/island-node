const Router = require('koa-router')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')

const router = new Router({
  prefix: '/v1/classic'
})

//获取最新期刊
router.get('/latest',async(ctx,next)=>{
  const flow = await Flow.findOne({
    order:[
      ['index','DESC']
    ]
  })
  console.log('flow===',flow.art_id, flow.type)

  const art = await Art.getData(flow.art_id, flow.type)
  console.log('art===',art)

  // const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type,ctx.auth.uid)
  art.setDataValue('index',flow.index)
  art.setDataValue('test','有问题')

  ctx.body = art.dataValues

})

// 获取下一期
router.get('/:index/next',async(ctx,next)=>{
  
})

// 获取上一期
router.get('/:index/previous',async(ctx,next)=>{
  
})

module.exports = router