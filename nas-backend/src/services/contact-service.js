
const { ContactRepository } = require('../repositories')

const contactRepository = new ContactRepository()

async function createContact(data) {
    const contact = await contactRepository.create(data)
    return contact
}

async function getAllContactDetails() {
    const allDetails = await contactRepository.getAll()
    return allDetails
}

async function deleteContactDetail(id) {
    return await contactRepository.delete(id)
}

module.exports = {
    createContact,
    getAllContactDetails,
    deleteContactDetail
}
