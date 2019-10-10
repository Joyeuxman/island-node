const requireDirectory = require('require-directory')
const Router = require('koa-router')


class InitManager{
  static initCore(app){
    InitManager.app = app
    InitManager.loadRouters()
    InitManager.loadConfig()
    InitManager.loadHttpException()
  }

  // 自动注册路由
  static loadRouters(){
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module,apiDirectory,{
      visit:whenLoadModule
    })

    function whenLoadModule(obj){
      // console.log('require-directory，加载到的module===',obj)
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 将系统配置加载到全局对象global上
  static loadConfig(path){
    const configPath = path || `${process.cwd()}/config/config`
    const config = require(configPath)
    global.config = config
  }

  // 将错误信息加载到全局对象global上
  static loadHttpException(){
    global.errs = require('@core/http-exception')
  }
}

module.exports = InitManager