const { LinValidator, Rule } = require('@utils/lin-validator-v2')
const { LoginType,ArtType } = require('@utils/enums')

/**
 * 正整数校验器
 */
class PositiveIntegerValidator extends LinValidator {
	constructor() {
		super()
		this.id = [new Rule('isInt', '需要是正整数', { min: 1 })]
	}
}

/**
 * token校验器
 */
class TokenValidator extends LinValidator{
  constructor(){
    super()
    this.account = [new Rule('isLength','不符合账号规则',{min: 4,max: 32})]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{min:6,max: 128})
    ]
  }

  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type是必须参数')
    }

    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type参数不合法')
    }
  }
}

/**
 * token不为空校验器
 */
class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token = [new Rule('isLength','不允许为空',{min: 1})]
  }
}


class ClassicValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    this.validateType = checkArtType
  }
}

class LikeValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    this.validateType = checkArtType
  }
}

class SearchValidator extends LinValidator{
  constructor(){
    super()
    this.q = [
      new Rule('isLength','搜索关键词不能为空',{min:1,max: 16})
    ]
    this.start = [
      new Rule('isInt','不符合规范',{min: 0,max: 60000}),
      new Rule('isOptional','',0)
    ]
    this.count = [
      new Rule('isInt','不符合规范',{min: 1,max: 20}),
      new Rule('isOptional','',20)
    ]
  }
}

class AddShortCommentValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    this.content = [
      new Rule('isLength','必须在1到12个字符之间',{min:1,max:12})
    ]
  }
}

/**
 * 校验type必填且为ArtType
 * @param {Object} vals ctx请求上下文
 */
function checkArtType(vals){
  let type = vals.body.type || vals.path.type
  if(!type){
    throw new Error('type是必须参数')
  }
  if(!ArtType.isThisType(+type)){
    throw new Error('type参数不合法')
  }
}

module.exports = {
  PositiveIntegerValidator,
  TokenValidator,
  NotEmptyValidator,
  ClassicValidator,
  LikeValidator,
  SearchValidator,
  AddShortCommentValidator
}
