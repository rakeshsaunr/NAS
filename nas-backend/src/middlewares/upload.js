// =====================================
// middlewares/multer.js
// =====================================

const multer = require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

// =====================================
// CLOUDINARY STORAGE
// =====================================

const storage =
  new CloudinaryStorage({
    cloudinary: cloudinary,

    params: async (req, file) => {
      let folder = "oms-files";

      // Image Folder
      if (
        file.mimetype.startsWith(
          "image"
        )
      ) {
        folder = "oms-images";
      }

      // Audio Folder
      else if (
        file.mimetype.startsWith(
          "audio"
        )
      ) {
        folder = "oms-audio";
      }

      // Documents Folder
      else {
        folder = "oms-documents";
      }

      return {
        folder,

        resource_type: "auto",

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "pdf",
          "mp3",
          "wav",
          "doc",
          "docx",
          "xls",
          "xlsx",
        ],
      };
    },
  });

// =====================================
// MULTER PARSER
// =====================================

const parser = multer({
  storage,
});

module.exports = parser;