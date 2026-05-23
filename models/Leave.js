import mongoose from "mongoose";

const leaveSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },

      employeeName: {
        type: String,
        required: true,
      },

      leaveType: {
        type: String,
        required: true,
      },

      fromDate: {
        type: String,
        required: true,
      },

      toDate: {
        type: String,
        required: true,
      },

      reason: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Leave = mongoose.model(
  "Leave",
  leaveSchema
);

export default Leave;