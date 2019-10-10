require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const InitManager = require('@root/core/init')
const catchError = require('@root/middlewares/exception')

require('@root/app/models/classic')

const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(7000,()=>console.log('Node-learn项目正在端口7000运行...'))

