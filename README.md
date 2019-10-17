## Node-learn


### 接口列表(共17个)

| 接口名称 | 接口地址 | 请求方式 | 入参 |
|:------|:------|:------|:------|
| 获取Token | http://localhost:3000/v1/token | POST | account、type |
| 验证Token | http://localhost:7000/v1/token/verify | POST | token |
|获取最新期刊| http://localhost:3000/v1/classic/latest | GET | no |
|获取下一期| http://localhost:3000/v1/classic/6/next | GET | no |
|获取上一期| http://localhost:3000/v1/classic/6/previous | GET | no |
|获取期刊点赞情况| | | |
|获取我喜欢的期刊| | | |
|获取期刊详情| | | |
|点赞| | | |
|取消点赞| | | |
|获取热门书籍列表| | | |
|获取书籍详情| | | |
|搜索书籍| | | |
|获取我喜欢书籍的数量| | | |
|获取书籍点赞情况| | | |
|新增短评| | | |
|获取书籍短评| | | |


### 可能出现的问题
#### Mysql执行`movie.sql`、`music.sql`、 `sentence.sql`时无法插入数据
* 报错信息 `ERROR 1292 (22007): Incorrect datetime value: '0000-00-00 00:00:00'`
* [解决方法](https://blog.csdn.net/zhengwei125/article/details/79003563/)
#### 如何将sequelize查询的结果的值返回给前端
```
ctx.body = art.dataValues
```




### 资源列表
* [sequlize中文文档](https://itbilu.com/nodejs/npm/VkYIaRPz-.html#)

### 安全机制
* 前端wx.login获取code,将code传递给后端
* 后端根据appId、appSecret、code向微信后端获取session
* 后端从session中取出openid,用来查找用户|生成用户(添加用户级别)
* 后端从用户信息中获取用户ID、用户级别
* 后端使用jwt对用户ID、用户级别加密生成token，返给前端
* 前端请求数据使用Basic-Auth加密token作为请求头，传递给后端
* 后端依次使用Basic-Auth、jwt解密token,校验请求是否合法，如合法则获取用户ID、用户级别


### basic-auth验证
* 前端实现（请求头中添加`Authorization:Basic base64(account:password)`）
  ```
  import {Base64} from 'js-base64'
  const token = wx.getStorageSync('token')// token 为后端返回的令牌
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
  ```
* 后端实现
```
const basicAuth = require('basic-auth')
const userToken = basicAuth(ctx.req) // userToken {name: token,pass:''}
```

### JWT安全验证（jsonwebtoken）
* 加密
* 语法 `jwt.sign(payload, secretOrPrivateKey, [options, callback])`
* 解密
* 语法 `jwt.verify(token, secretOrPublicKey, [options, callback])`

### 模块别名(module-alias)
* 模块别名可以解决使用相对路径引用模块时，造成的路径错误
* 使用统一的路径来引用模块
* [使用方法](https://www.npmjs.com/package/module-alias)

### HTTP常见的状态码

#### 2XX 成功
* 200 OK，表示从客户端发来的请求在服务器端被正确处理
* 204 No content，表示请求成功，但响应报文不含实体的主体部分
* 206 Partial Content，进行范围请求

#### 3XX 重定向
* 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
* 302 found，临时性重定向，表示资源临时被分配了新的 URL
* 303 see other，表示资源存在着另一个 URL，应使用 GET 方法丁香获取资源
* 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
* 307 temporary redirect，临时重定向，和302含义相同

#### 4XX 客户端错误
* 400 bad request，请求报文存在语法错误
* 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
* 403 forbidden，表示对请求资源的访问被服务器拒绝
* 404 not found，表示在服务器上没有找到请求的资源

#### 5XX 服务器错误
* 500 internal sever error，表示服务器端在执行请求时发生了错误
* 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求