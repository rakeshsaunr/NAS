const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (filePath) => {
  const res = await cloudinary.uploader.upload(filePath, { folder: 'portfolio' });
  return res.secure_url;
};
