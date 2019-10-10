const { Op } = require('sequelize')
const {Movie,Sentence,Music} = require('@models/classic')
const {
	MOVIE_TYPE,
	MUSIC_TYPE,
	SENTENCE_TYPE,
	BOOK_TYPE
} = require('@root/utils/enums').ArtType

class Art {
	constructor() {}

	// 获取期刊的数据
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
}

module.exports = {Art}
