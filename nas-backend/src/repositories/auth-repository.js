const CrudRepository = require("./crud-repository");

const User = require("../models/auth-model");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  // ✅ FIND USER BY EMAIL
  async findByEmail(email) {
    return await this.model
      .findOne({ email })
      .select("+password");
  }

  // ✅ GET USER BY EMAIL
  async getUserByEmail(email) {
    return await this.findByEmail(
      email
    );
  }
}

// ✅ EXPORT INSTANCE
module.exports = new UserRepository();