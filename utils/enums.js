/**
 * 枚举数据
 */

// 作品类型
const ArtType = {
    MOVIE_TYPE: 100,
    MUSIC_TYPE: 200,
    SENTENCE_TYPE: 300,
    BOOK_TYPE: 400,
    isThisType
}

// 登录方式
const LoginType = {
  USER_MINI_PROGRAM:100,
  USER_EMAIL:101,
  USER_MOBILE:102,
  ADMIN_EMAIL:200,
  isThisType
}

/**
 * 判断该字段是否为该枚举数据中的一个
 * @param {String} val 需要判断类型的字段
 */
function isThisType(val){
  for(let key in this){
    if(this[key] === val){
      return true
    }
  }
  return false
}

module.exports = {
  ArtType,
  LoginType
}