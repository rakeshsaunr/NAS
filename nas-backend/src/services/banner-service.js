
const { BannerRepository } = require('../repositories')

const bannerRepository = new BannerRepository()

async function createBanner(data) {
    const banner = await bannerRepository.create(data)
    return banner
}

async function getBanner(bannerId) {
    const banner = await bannerRepository.getById(bannerId)
    return banner
}

async function getBanners() {
    const banners = await bannerRepository.getAll()
    return banners
}

async function deleteBanner(bannerId) {
    return await bannerRepository.delete(bannerId)
}

module.exports = {
    createBanner,
    getBanners,
    getBanner,
    deleteBanner
}