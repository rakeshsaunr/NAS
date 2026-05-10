const { BlogModel } = require('../models')
const CrudRespository = require('./crud-repository')


class BlogRespository extends CrudRespository {
    constructor() {
        super(BlogModel)
    }
}

module.exports = BlogRespository