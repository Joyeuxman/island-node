## 小程序-岛-后端
> Node+

### 资源
* [项目地址](https://github.com/TaleLin) 
* [ES规范](https://github/tc39 )
* [sequlize中文文档](https://itbilu.com/nodejs/npm/VkYIaRPz-.html#)
* 推荐书籍：代码大全2


### 接口列表(共17个)
请求前缀：`http://localhost:7000`

| 接口名称 | 接口地址 | 请求方式 | body请求体中参数 |
|:------|:------|:------|:------|
| 获取Token | /v1/token | POST | account、type |
| 验证Token | /v1/token/verify | POST | token |
|获取最新期刊| /v1/classic/latest | GET | no |
|获取下一期| /v1/classic/:index/next | GET | no |
|获取上一期| /v1/classic/:index/previous | GET | no |
|获取期刊点赞情况| v1/classic/:type/:art_id/favor | GET | no|
|获取我喜欢的期刊| /v1/classic/favor | GET | no |
|获取期刊详情| v1/classic/:type/:id | GET | no |
|点赞| /v1/like | POST | art_id、type |
|取消点赞| /v1/like/cancel | POST | art_id、type |
|获取热门书籍列表| /v1/book/hot_list | GET| no |
|获取书籍详情| /v1/book/:book_id/detail | GET | no |
|搜索书籍| /v1/book/search | POST | q、start、count |
|获取我喜欢书籍的数量| /v1/book/favor/count | GET | no |
|获取书籍点赞情况| v1/book/:book_id/favor | GET | no |
|新增短评| /v1/book/add/short_comment | POST | book_id、content |
|获取书籍短评| /v1/book/:book_id/short_comment | GET | no |


### 可能出现的问题
#### Mysql执行`movie.sql`、`music.sql`、 `sentence.sql`时无法插入数据
* 报错信息 `ERROR 1292 (22007): Incorrect datetime value: '0000-00-00 00:00:00'`
* [解决方法](https://blog.csdn.net/zhengwei125/article/details/79003563/)
#### 如何将sequelize查询的结果的值返回给前端
```
ctx.body = art.dataValues
```
#### 静态资源托管的图片无法打开
* 地址为：`http://localhost:7000/images/movie.4.png`

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


### 注意事项
* 新建数据库时字符集为`utf8mbp4`,默认排序规则为`utf8mbp4_grneral_ci`
* 使用`sequelize`连接`mysql`需要安装驱动器(npm包)`mysql2`
* koa使用中间件时注意
```
    router.post('/test',new Class())
    // 无论有多少次 test请求，都只会实例化一次 new Class()，导致变量污染
```
* 小程序对cnpm的支持不是很好，不建议使用
* base64.js 对token加密
* Authorization:Basic base64(account:password)
* 对数据库进行增删改查时，如果有多个操作，为了保证这些操作，要不同时成功，要不同时失败，需要使用数据库事务来保证 
* 关系型数据库的特点：ACID 原子性 一致性 隔离性 持久性
* sequlize库中scope使用有bug,使用全局scope之后，不能对相应实例进行增删改查
* 通过url传递参数的时候，数据类型都是字符串，使用body+json方式可以传递数字格式的数据
* python 爬虫工具(开发必备，核心是正则表达式)  requests，BF4，Scrapy


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

### 课程进度
* 12-2