const CrudRepository = require('./crud-repository')
const { BannerModel } = require('../models')

class BannerRepository extends CrudRepository {
    constructor() {
        super(BannerModel)
    }
}

module.exports = BannerRepository