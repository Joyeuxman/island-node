const {Sequelize,Model} = require('sequelize')
const {unset,clone,isArray} = require('lodash')
const {dbName,user,password,host,port} = require('@root/config/config.js').database

/**
 * new Sequelize(database, [username=null], [password=null], [options={}])
 */
const sequelize = new Sequelize(
  dbName,
  user,
  password,
  {
    dialect:'mysql',//要连接的数据库类型。可选值有：mysql、postgres、sqlite、mariadb、mssql
    host,// 连接数据库的主机
    port,// 连接数据库的端口
    logging: false,//是否开启日志打印
    timezone: '+08:00',//北京时间  时间转换时从数据库得到的JavaScript时间。这个时区将应用于连接服务器的 NOW、CURRENT_TIMESTAMP或其它日期函数
    define:{ //模型定义
      timestamps: true,// 为模型添加 createdAt 和 updatedAt 两个时间戳字段
      paranoid: true, // 使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，而是设置一个 deletedAt 列。此设置需要 timestamps=true
      createdAt: 'created_at',//如果为字符串，则使用提供的值代替 createdAt 列的默认名，设置为flase则不添加这个字段。
      updatedAt: 'updated_at',//如果为字符串，则使用提供的值代替 updatedAt 列的默认名，设置为flase则不添加这个字段。
      deletedAt: 'deleted_at',//如果为字符串，则使用提供的值代替 deletedAt 列的默认名，设置为flase则不添加这个字段。
      underscored: true,// 转换列名的驼峰命名规则为下划线命令规则
      freezeTableName: true, // 设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
      //全局范围，定义 defaultScope 的定义形式相同。关于限制范围的定义请参考Model.scope。定义默认的限制范围后，默认限制会在每次查询时起作用：
      scopes:{ 
        bh:{// 每次查询从查询结果中剔除'updated_at','deleted_at','created_at'
          attributes: {
            exclude: ['updated_at','deleted_at','created_at']
          }
        }

      }
    }
  }
)

// 同步模型到数据库
// 同步Model结构到数据库中，即：在数据库中创建表。执行成功后，会在回调中返回模弄的实例（this）。
// 通过设置 force 属性会首先删除表并重新创建(强烈建议不要设置为true)
sequelize.sync({
  force: false
})

Model.prototype.toJSON = function(){
  // const 
}



module.exports = {sequelize}