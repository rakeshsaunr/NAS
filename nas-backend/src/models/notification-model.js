// ===============================
// REMINDER MODEL
// models/reminder-model.js
// ===============================
import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    reminderType: {
      type: String,
      enum: ["WhatsApp", "SMS", "Email"],
    },

    dueDate: Date,

    message: String,

    status: {
      type: String,
      enum: ["Pending", "Sent"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reminder", reminderSchema);