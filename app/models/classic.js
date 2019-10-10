const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('@core/db.js')

// 实体movie、music、sentence的公共字段
// type 字段类型
// comment 字段说明
// defaultValue 默认值
const classicFields = {
	image: {
    type: Sequelize.STRING,
    comment:'作品封面图片'
	},
	content:{
    type: Sequelize.STRING,
    comment:'作品内容'
  },
	pubdate:{
    type: Sequelize.DATEONLY,
    comment:'作品发布时间'
  },
	title:{
    type: Sequelize.STRING,
    comment:'作品名称'
  },
	type:{
    type: Sequelize.TINYINT,
    comment:'作品类型'
  },
	fav_nums: {
		type: Sequelize.INTEGER,
    defaultValue: 0,
    comment:'喜欢该作品的人数'
	}
}

// music的实体字段
const musicFields = Object.assign({
  url: {
    type: Sequelize.STRING,
    comment: '音乐的播放地址'
  }
},classicFields)

class Movie extends Model {}
Movie.init(classicFields, {
	sequelize,
	tableName: 'movie'
})

class Music extends Model {}
Music.init(musicFields, {
	sequelize,
	tableName: 'music'
})

class Sentence extends Model {}
Sentence.init(classicFields, {
	sequelize,
	tableName: 'sentence'
})

module.exports = {
	Movie,
	Music,
	Sentence
}
