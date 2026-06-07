import Attendance from "../models/Attendance.js";

export const checkIn = async (req, res) => {

try {


const {
  employeeId,
  employeeName,
  latitude,
  longitude,
  city,
  area,
  district,
} = req.body;

const attendance = new Attendance({

  employeeId,

  employeeName,

  checkInTime: new Date().toLocaleString(),

  city,

  area,

  district,

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
      await Attendance.findById(
        req.params.id
      );

    if (!attendance) {

      return res.status(404).json({
        message: "Attendance Not Found",
      });

    }

    const checkInDate =
      new Date(attendance.checkInTime);

    const checkOutDate =
      new Date();

    const diffMs =
      checkOutDate - checkInDate;

    const totalHours =
      (diffMs / (1000 * 60 * 60))
      .toFixed(2);

    attendance.checkOutTime =
      checkOutDate.toLocaleString();

    attendance.workingHours =
      `${totalHours} Hours`;

    await attendance.save();

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