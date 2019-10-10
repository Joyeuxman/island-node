const { LinValidator, Rule } = require('@utils/lin-validator-v2')
const { LoginType } = require('@utils/enums')

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

module.exports = {
  PositiveIntegerValidator,
  TokenValidator,
  NotEmptyValidator
}
