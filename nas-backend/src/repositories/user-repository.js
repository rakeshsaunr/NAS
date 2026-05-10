const CrudRepository = require("./crud-repository");
const { UserModel } = require('../models')

class UserRepository extends CrudRepository {
    constructor() {
        super(UserModel)
    }

    async findByEmail(email) {
        const user = await UserModel.findOne({ email })
        return user
    }
}

module.exports = UserRepository