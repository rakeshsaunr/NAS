
const { CoupanRepository } = require('../repositories')

const coupanRepository = new CoupanRepository()

async function createCoupan(data) {
    const newCoupan = await coupanRepository.create(data)
    return newCoupan
}

async function getAllCoupans() {
    const allCoupans = await coupanRepository.getAll()
    return allCoupans
}

module.exports = {
    createCoupan,
    getAllCoupans
}