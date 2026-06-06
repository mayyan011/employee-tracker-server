import Attendance from "../models/Attendance.js";

export const checkIn = async (req, res) => {

try {


const {
  employeeId,
  employeeName,
  latitude,
  longitude,
} = req.body;

const attendance = new Attendance({

  employeeId,

  employeeName,

  checkInTime: new Date().toLocaleString(),

  location: {
    latitude,
    longitude,
  },

  tracking: [
    {
      latitude,
      longitude,
      time: new Date().toLocaleString(),
    },
  ],

});

await attendance.save();

res.status(200).json({
  message: "Check In Success",
  attendance,
});


} catch (error) {


console.log(error);

res.status(500).json({
  message: error.message,
});


}

};

export const checkOut = async (req, res) => {

try {


const attendance =
  await Attendance.findByIdAndUpdate(
    req.params.id,
    {
      checkOutTime:
        new Date().toLocaleString(),
    },
    { new: true }
  );

res.status(200).json({
  message: "Check Out Success",
  attendance,
});


} catch (error) {


console.log(error);

res.status(500).json({
  message: error.message,
});


}

};

export const updateLocation = async (req, res) => {

try {


const {
  attendanceId,
  latitude,
  longitude,
} = req.body;

await Attendance.findByIdAndUpdate(
  attendanceId,
  {
    $push: {
      tracking: {
        latitude,
        longitude,
        time:
          new Date().toLocaleString(),
      },
    },
  }
);

res.status(200).json({
  message: "Location Updated",
});


} catch (error) {


console.log(error);

res.status(500).json({
  message: error.message,
});


}

};

export const getAttendance = async (req, res) => {

try {


const attendance =
  await Attendance.find();

res.status(200).json(
  attendance
);


} catch (error) {


console.log(error);

res.status(500).json({
  message: error.message,
});


}

};