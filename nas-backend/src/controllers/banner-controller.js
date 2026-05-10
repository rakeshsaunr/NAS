
const { BannerService } = require('../services')
const cloudinary = require('../config/cloudinary')

async function createBanner(req,res) {
    try {
        const data = req.body
        const imageUrl = req.file.path
        const publicId = req.file.filename

        const bannerData = {
            ...data,
            url:imageUrl,
            public_id: publicId
        }

        const banner = await BannerService.createBanner(bannerData)
        console.log("Banner is:",banner)
        return res.status(200).json({
            success: true,
            message: "Banner Created Successfully",
            data: banner
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Banner Creation",
            error: error.message
        })
    }
}

async function getBanners(req,res) {
    try {
        const banners = await BannerService.getBanners()
        return res.status(200).json({
            success: true,
            message: "Banners Fetched Successfully",
            data: banners
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Errors in Banner Fetching",
            error: error.message
        })
    }
}


async function deleteBanner(req,res) {
    try {
        const { id } = req.params

        const banner = await BannerService.getBanner(id)

        if(!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner Not Found"
            })
        }

        // Delete banner image from cloudinary
        if(banner.public_id){
            await cloudinary.uploader.destroy(banner.public_id) // destoy code so banner delete from cloiudionary

        }

        // delete banner from database
        await BannerService.deleteBanner(id)

        return res.status(200).json({
            success: true,
            message: "Banner and its image deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Error deleting Banner",
            error:error.message
        })
    }
}

module.exports = {
    createBanner,
    getBanners,
    deleteBanner
}