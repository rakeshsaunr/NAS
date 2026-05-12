const CrudRepository = require("./crud-repository");
const { UserModel } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        // ✅ include password and passwordHash explicitly
        return this.model.findOne({ email }).select('+password +passwordHash');
    }
}

module.exports = UserRepository;
