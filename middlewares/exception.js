const {HttpException} = require('@root/core/http-exception')


const catchError = async (ctx,next)=>{
  try {
    await next()
  }catch(error){
    // 区分开发环境还是生产环境
    // 开发环境 并且 不是HttpException的实例，直接抛出错误
    console.log('捕获到错误===',error)
    const isHttpException = error instanceof HttpException
    const isDev = global.config.app_env === 'dev'

    if(isDev && !isHttpException){
      throw error
    }

    if(isHttpException){
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }else{
      ctx.body = {
        msg: 'we make a mistake O(∩_∩)O~~',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}



module.exports = catchError