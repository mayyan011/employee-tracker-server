import express from "express";

import {
  checkIn,
  checkOut,
  updateLocation,
  getAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

/* =========================
   CHECK IN
========================= */

router.post(
  "/checkin",
  checkIn
);

/* =========================
   CHECK OUT
========================= */

router.put(
  "/checkout/:id",
  checkOut
);

/* =========================
   LIVE LOCATION
========================= */

router.post(
  "/location",
  updateLocation
);

/* =========================
   GET ALL ATTENDANCE
========================= */

router.get(
  "/all",
  getAttendance
);

export default router;