const  CrudRepository  = require("./crud-repository");
const { CoupanModel } = require('../models')

class CoupanRepository extends CrudRepository {
    constructor() {
        super(CoupanModel)
    }
}

module.exports = CoupanRepository