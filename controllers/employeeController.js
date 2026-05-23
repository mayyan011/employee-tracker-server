import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   CREATE EMPLOYEE
========================= */

export const createEmployee = async (
    req,
    res
) => {

    try {

        const {
            employeeName,
            designation,
            email,
            contactNumber,
            city,
            password,
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

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const employee =
            await Employee.create({
                employeeName,
                designation,
                email,
                contactNumber,
                city,
                password: hashedPassword,
            });

        res.status(201).json({
            message:
                "Employee created successfully",
            employee,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

/* =========================
   EMPLOYEE LOGIN
========================= */

export const loginEmployee = async (
    req,
    res
) => {

    try {

        const { email, password } =
            req.body;

        const employee =
            await Employee.findOne({
                email,
            });

        if (!employee) {

            return res.status(404).json({
                message:
                    "Employee not found",
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                employee.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message:
                    "Invalid credentials",
            });

        }

        const token = jwt.sign(
            {
                id: employee._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message:
                "Employee login successful",
            token,
            employee,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

/* =========================
   GET ALL EMPLOYEES
========================= */

export const getEmployees = async (
    req,
    res
) => {

    try {

        const employees =
            await Employee.find();

        res.status(200).json(
            employees
        );

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};