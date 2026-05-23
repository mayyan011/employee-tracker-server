import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";


const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(express.json());
/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {

    console.log("MongoDB Connected");

  })
  .catch((error) => {

    console.log("MongoDB Error:");
    console.log(error);

  });

/* =========================
   ROUTES
========================= */

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/employee",
  employeeRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/leave",
  leaveRoutes
);

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {

  res.send(
    "Employee Tracking Server Running"
  );

});

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});