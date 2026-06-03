const mongoose = require("mongoose");

// =====================================
// ITEM TYPE MASTER SCHEMA
// =====================================

const itemTypeSchema = new mongoose.Schema(
  {
    // Item Type Code: e.g. ITM-0001, auto generate
    itemTypeCode: {
      type: String,
      unique: true,
    },

    // Item Type Name/Title
    itemTypeName: {
      type: String,
      required: true,
      trim: true,
    },

    // Remark/Description (optional)
    remark: {
      type: String,
      trim: true,
    },

    // Comments (optional, array of strings)
    comments: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE ITEM TYPE CODE
// =====================================

itemTypeSchema.pre("save", async function (next) {
  try {
    if (!this.itemTypeCode) {
      const total = await mongoose.model("ItemType").countDocuments();
      this.itemTypeCode = `ITM-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// =====================================
// MODEL EXPORT
// =====================================

const ItemType =
  mongoose.models.ItemType ||
  mongoose.model("ItemType", itemTypeSchema);

module.exports = ItemType;