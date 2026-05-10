
const CrudRepository = require('./crud-repository')
const { ContactModel } = require('../models')

class ContactRepository extends CrudRepository {
    constructor(){
        super(ContactModel)
    }
}

module.exports = ContactRepository