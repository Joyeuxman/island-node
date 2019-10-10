/**
 * 系统配置
 */

 module.exports = {
   // 环境变量
   env: 'dev',
   // mysql 数据库配置
   database:{
     dbName: 'island',
     host: 'localhost',
     port: 3306,
     user: 'root',
     password:'1234qwer'
   },
   // 加密信息（盐、过期时间）
   security:{
    secretKey: '1234qwer!@#$',
    expiresIn: 60 * 60 * 24 * 30 // 过期时间：一个月
   },
   wx:{ // 小程序信息
     appId: 'wx4ffd105ef0e8075b',
     appSecret: 'a46ddcdbcb10d946093ee872407a52a7',
     loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
   },
   yushu:{
    detailUrl:'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
 }