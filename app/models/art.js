const { Op } = require('sequelize')
const {Movie,Sentence,Music} = require('@models/classic')
const {
	MOVIE_TYPE,
	MUSIC_TYPE,
	SENTENCE_TYPE,
	BOOK_TYPE
} = require('@root/utils/enums').ArtType
const {NotFound} = require('@core/http-exception')

class Art {
	constructor(art_id,type) {
		this.art_id = art_id
		this.type = type
	}

	/**
	 * 获取Art的数据
	 * @param {String} art_id movie/misic/sentence/book实体表的主键ID
	 * @param {Number} type 判断该Art对应movie/misic/sentence/book中的某一个
	 * @param {Boolean} useScope 查询结果中是否剔除created_at/updated_at等字段
	 */
	static async getData(art_id, type, useScope = true) {
		let art = null
		const scope = useScope ? 'bh' : null
		const finder = {
			where: {
				id: art_id
			}
		}

		switch (type) {
			case MOVIE_TYPE:
				art = await Movie.scope(scope).findOne(finder)
				break
			case MUSIC_TYPE:
				art = await Music.scope(scope).findOne(finder)
				break
			case SENTENCE_TYPE:
				art = await Sentence.scope(scope).findOne(finder)
				break
			case BOOK_TYPE:
        const {Book} = require('./book')
         art = await Book.scope(scope).findOne(finder)
         if(!art){
           art = await Book.create({id:art_id})
         }
        break
      default: 
         break
    }
    
    return art
	}

	/**
	 * 获取Art详情数据
	 * @param {String} uid 用户ID
	 */
	async getDetail(uid){
		const {Favor} = require('@models/favor')
		const art = await Art.getData(this.art_id,this.type,uid)
		if(!art){
			throw new NotFound()
		}
		const like = await Favor.userLikeIt(this.art_id,this.type,uid)
		return {
			art,
			like_status: like
		}
	}

	/**
	 * 获取用户喜欢的期刊
	 * @param {Array} artInfoList 
	 */
	static async getList(artInfoList){
		const artInfoObj = {
			100: [],
			200: [],
			300: []
		}
		for( let artInfoItem of artInfoList){
			artInfoObj[artInfoItem.type].push(artInfoItem.art_id)
		}

		const arts = []
		for(let key in artInfoObj){
			const ids = artInfoObj[key]
			if(ids.length === 0){
				continue
			}
			arts.push(await Art._getListByType(ids,key))
		}
		return arts
	}

	/**
	 * 根据art_id数组和art类型查询art
	 * @param {Array} ids art_id数组
	 * @param {Number} type art类型
	 */
	static async _getListByType(ids,type){
		let arts = []
		// 条件：id在ids之中
		const finder = {
			where:{
				id: {
					[Op.in]: ids
				}
			}
		}
		const scope = 'bh'
		switch (type) {
			case 100:
					arts = await Movie.scope(scope).findAll(finder)
					break
			case 200:
					arts = await Music.scope(scope).findAll(finder)
					break
			case 300:
					arts = await Sentence.scope(scope).findAll(finder)
			case 400:
					break
			default:
					break
		}
		return arts
	}
}

module.exports = {Art}
