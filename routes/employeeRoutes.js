import express from "express";

import Employee from "../models/Employee.js";

const router = express.Router();

/* =========================
   CREATE EMPLOYEE
========================= */

router.post(
  "/create",
  async (req, res) => {

    try {

      const {
        employeeName,
        designation,
        email,
        password,
        contactNumber,
        city,
      } = req.body;

      const existingEmployee =
        await Employee.findOne({
          email,
        });

      if (existingEmployee) {

        return res.status(400).json({
          message:
            "Employee already exists",
        });

      }

      const newEmployee =
        new Employee({
          employeeName,
          designation,
          email,
          password,
          contactNumber,
          city,
        });

      await newEmployee.save();

      res.json({
        message:
          "Employee Created Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

/* =========================
   EMPLOYEE LOGIN
========================= */

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const employee =
        await Employee.findOne({
          email,
          password,
        });

      if (!employee) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });

      }

      res.json({
        message:
          "Login Success",
        employee,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

/* =========================
   GET ALL EMPLOYEES
========================= */

router.get(
  "/all",
  async (req, res) => {

    try {

      const employees =
        await Employee.find();

      res.json(employees);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);
/* =========================
   UPDATE EMPLOYEE
========================= */

router.put(
  "/update/:id",
  async (req, res) => {

    try {

      const updatedEmployee =
        await Employee.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        message:
          "Employee Updated Successfully",
        updatedEmployee,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);
/* =========================
   DELETE EMPLOYEE
========================= */

router.delete(
  "/delete/:id",
  async (req, res) => {

    try {

      await Employee.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Employee Deleted Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);
export default router;