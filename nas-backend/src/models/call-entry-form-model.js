const mongoose = require("mongoose");

/**
 * Assignment history schema for permanent storage of assignment actions.
 * This tracks every assignment/reassignment/change as a permanent log.
 */
const assignmentHistorySchema = new mongoose.Schema(
  {
    technicianAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnicianMaster",
      required: true,
    },
    technicianName: {
      type: String,
      trim: true,
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeMaster",
      required: true,
    },
    assignedByName: {
      type: String,
      trim: true,
      required: true,
    },
    assignRemark: {
      type: String,
      trim: true,
    },
    callStatus: {
      type: String,
      trim: true,
      required: true,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Hold",
        "Completed",
        "Closed",
        "Reassigned",
      ],
    },
    assignedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { _id: false }
);

const callEntrySchema = new mongoose.Schema(
  {
    // =====================================
    // AUTO CALL NUMBER
    // =====================================
    callNo: {
      type: String,
      unique: true,
      sparse: true, // Delayed until set, prevents index errors
    },
    srNo: {
      type: Number,
      unique: true,
      sparse: true,
    },

    // =====================================
    // CALL DATE & TIME
    // =====================================
    callDate: {
      type: Date,
      default: Date.now,
    },
    callTime: {
      type: String,
      trim: true,
    },

    // =====================================
    // CUSTOMER DETAILS
    // =====================================
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerMaster",
      required: true,
    },
    customerType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerTypeMaster",
      required: true,
    },
    endUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EndUserMaster",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    callLoggedBy: {
      type: String,
      trim: true,
    },
    warrantyInformation: {
      type: String,
      trim: true,
    },

    // =====================================
    // CALL DETAILS
    // =====================================
    callType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallMaster",
      required: true,
    },
    chargeAmount: {
      type: Number,
      default: 0,
    },
    natureOfCall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallNatureMaster",
    },
    instrument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstrumentMaster",
    },
    problemDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
    preferredDate: {
      type: Date,
    },
    preferredTimings: {
      type: String,
      trim: true,
    },
    callAttempt: {
      type: Number,
      default: 1,
    },

    // =====================================
    // ASSIGNMENT FLOW - Assignment Module fields
    // =====================================
    technicianAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechnicianMaster",
    },
    technicianName: {
      type: String,
      trim: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeMaster",
    },
    assignedByName: {
      type: String,
      trim: true,
    },
    assignedDateTime: {
      type: Date,
    },
    assignRemark: {
      type: String,
      trim: true,
    },
    callStatus: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Hold",
        "Completed",
        "Closed",
        "Reassigned",
      ],
      default: "Pending",
    },
    assignmentHistory: {
      type: [assignmentHistorySchema],
      default: [],
    },

    /**
     * Call urgency (optional ref)
     */
    callUrgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CallUrgency",
    },

    // =====================================
    // FOR BACKWARD COMPATIBILITY (Old fields)
    // =====================================
    // For migration support; do not remove immediately
    engineerAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeMaster",
    },
    assignedDate: {
      type: Date,
    },

    // =====================================
    // CALL NOTED BY
    // =====================================
    callNotedBy: {
      type: String,
      trim: true,
    },

    // =====================================
    // CLOUDINARY FILES -- Only ATTACHMENT (NO audio)
    // =====================================
    attachment: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    // =====================================
    // STATUS
    // =====================================
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE CALL NUMBER
// =====================================

/**
 * Auto-increment for srNo and callNo for each call
 */
callEntrySchema.pre("save", async function (next) {
  try {
    if (!this.callNo || !this.srNo) {
      const Counter = mongoose.connection.collection("callentrycounters");
      const counter = await Counter.findOneAndUpdate(
        { _id: "callEntry" },
        { $inc: { seq: 1 } },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      let srNo;
      if (counter && counter.value && typeof counter.value.seq === "number") {
        srNo = counter.value.seq;
      } else if (counter && typeof counter.seq === "number") {
        srNo = counter.seq;
      } else {
        return next(new Error("Failed to generate auto-increment srNo for Call Entry."));
      }
      this.srNo = srNo;
      this.callNo = `CALL-${String(srNo).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CallEntry =
  mongoose.models.CallEntry ||
  mongoose.model("CallEntry", callEntrySchema);

module.exports = CallEntry;