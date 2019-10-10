/**
 * 请求错误返回的数据信息
 * msg: 请求错误返回的提示信息
 * errorCode: 自定义错误码
 * code: 自定义错误状态码
 */

class HttpException extends Error{
  constructor(msg='服务器异常',errorCode=10000,code=400){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class Success extends HttpException{
  constructor(msg,errorCode){
    super()
    this.msg = msg || '请求成功'
    this.code = 201
    this.errorCode = errorCode || 0
  }
}

class ParameterException extends HttpException{
  constructor(msg,errorCode){
    super()
    this.msg = msg || '参数错误'
    this.code = 400
    this.errorCode = errorCode || 10000
  }
}

class AuthFailed extends HttpException{
  constructor(msg,errorCode){
    super()
    this.msg = msg || '授权失败'
    this.code = 401
    this.errorCode = errorCode || 10004
  }
}

class Forbbiden extends HttpException{
  constructor(msg,errorCode){
    super()
    this.msg = msg || '禁止访问'
    this.code = 403
    this.errorCode = errorCode || 10006
  }
}

class NotFound extends HttpException{
  constructor(msg,errorCode){
    super()
    this.msg = msg || '资源未找到'
    this.code = 404
    this.errorCode = errorCode || 10000
  }
}

module.exports = {
  HttpException,
  Success,
  ParameterException,
  AuthFailed,
  Forbbiden,
  NotFound
}