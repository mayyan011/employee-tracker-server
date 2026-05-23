import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   CREATE ADMIN
========================= */

export const createAdmin = async (
  req,
  res
) => {

  try {

    const {
      name,
      designation,
      email,
      contactNumber,
      city,
      password,
    } = req.body;

    const existingAdmin =
      await Admin.findOne({
        email,
      });

    if (existingAdmin) {

      return res.status(400).json({
        message:
          "Admin already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const profileImage =
      req.file
        ? req.file.filename
        : "";

    const admin =
      await Admin.create({

        name,
        designation,
        email,
        contactNumber,
        city,
        password:
          hashedPassword,
        profileImage,

      });

    res.status(201).json({

      message:
        "Admin created successfully",

      admin,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

/* =========================
   ADMIN LOGIN
========================= */

export const loginAdmin = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {

      return res.status(404).json({

        message:
          "Admin not found",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials",

      });

    }

    const token = jwt.sign(

      {
        id: admin._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      message:
        "Admin login successful",

      token,

      admin,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

/* =========================
   GET ADMIN PROFILE
========================= */

export const getAdminProfile =
  async (req, res) => {

    try {

      const admin =
        await Admin.findById(
          req.params.id
        );

      if (!admin) {

        return res
          .status(404)
          .json({

            message:
              "Admin not found",

          });

      }

      res.status(200).json(
        admin
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };