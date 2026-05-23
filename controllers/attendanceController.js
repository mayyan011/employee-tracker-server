export const checkIn = async (
  req,
  res
) => {

  try {

    res.status(200).json({
      message:
        "Check In Success",
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Check In Failed",
    });

  }

};

export const checkOut = async (
  req,
  res
) => {

  try {

    res.status(200).json({
      message:
        "Check Out Success",
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Check Out Failed",
    });

  }

};

export const updateLocation =
  async (req, res) => {

    try {

      res.status(200).json({
        message:
          "Location Updated",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Location Update Failed",
      });

    }

};

export const getAttendance =
  async (req, res) => {

    try {

      res.status(200).json([]);

    } catch (error) {

      res.status(500).json({
        message:
          "Attendance Fetch Failed",
      });

    }

};