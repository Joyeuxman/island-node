/**
 * 
 */
const util = require('util')
const axios = require('axios')
const {User} = require('@models/user')
const {generateToken} = require('@utils/index')
const {Auth} = require('@middlewares/auth')
const {AuthFailed} = require('@core/http-exception')

class WXManager{
  static async codeToToken(code){
    const {loginUrl,appId,appSecret} = global.config.wx
    const url = util.format(loginUrl,appId,appSecret,code)
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    const {errcode,errmsg,openid} = result.data
    if(errcode){
      throw new AuthFailed('openid获取失败:'+errmsg)
    }
    let user = await User.getUserByOpenid(openid)
    if(!user){
      user = await User.registerByOpenid(openid)
    }
    return generateToken(user.id,Auth.USER)
  }
}

module.exports = {WXManager}