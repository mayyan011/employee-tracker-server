import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },

  employeeName: String,

  checkInTime: String,

  checkOutTime: String,

  city: String,

  location: {
    latitude: Number,
    longitude: Number,
  },

  tracking: [
    {
      latitude: Number,
      longitude: Number,
      time: String,
    },
  ],
});

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;