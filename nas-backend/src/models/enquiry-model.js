const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,

      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,

      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },

    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
    },

    cameraCount: {
      type: Number,
      default: 0,
      min: [0, "Camera count cannot be negative"],
    },

    brand: {
      type: String,
      trim: true,
      default: "",
    },

    installAddress: {
      type: String,
      required: [true, "Install address is required"],
      trim: true,
    },

    location: {
      latitude: {
        type: Number,
        default: null,
        min: -90,
        max: 90,
      },

      longitude: {
        type: Number,
        default: null,
        min: -180,
        max: 180,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      googleMapLink: {
        type: String,
        default: "",
        trim: true,
      },
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },

    contactTime: {
      type: String,
      required: [true, "Contact time is required"],
      trim: true,
    },

    files: [
      {
        url: {
          type: String,
          trim: true,
        },

        public_id: {
          type: String,
          trim: true,
        },

        fileType: {
          type: String,
          trim: true,
        },
      },
    ],

    status: {
      type: String,

      enum: [
        "Pending",
        "Contacted",
        "In Progress",
        "Completed",
        "Rejected",
      ],

      default: "Pending",
    },

    source: {
      type: String,
      default: "Website",
      trim: true,
    },

    ipAddress: {
      type: String,
      default: "",
      trim: true,
    },

    userAgent: {
      type: String,
      default: "",
      trim: true,
    },

    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    assignedTo: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Indexes */
enquirySchema.index({ createdAt: -1 });

enquirySchema.index({ status: 1 });

enquirySchema.index({ service: 1 });

enquirySchema.index({
  "location.latitude": 1,
  "location.longitude": 1,
});

const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;