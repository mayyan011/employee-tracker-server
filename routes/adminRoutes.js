import express from "express";

import bcrypt from "bcryptjs";

import upload from "../middleware/upload.js";

import Admin from "../models/Admin.js";

import {
  createAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";

const router = express.Router();

/* =========================
   CREATE ADMIN
========================= */

router.post(

  "/create",

  upload.single("profileImage"),

  createAdmin

);

/* =========================
   LOGIN ADMIN
========================= */

router.post(

  "/login",

  async (req, res) => {

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

        return res.status(400).json({

          message:
            "Invalid Email",

        });

      }

      if (
        password !==
        admin.password
      ) {

        return res.status(400).json({

          message:
            "Invalid Password",

        });

      }

      res.json({

        message:
          "Login Success",

        admin,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);

/* =========================
   GET ADMIN PROFILE
========================= */

router.get(

  "/profile/:id",

  getAdminProfile

);

/* =========================
   UPDATE ADMIN PROFILE
========================= */

router.put(

  "/update/:id",

  upload.single("profileImage"),

  async (req, res) => {

    try {

      const updatedData = {

        name:
          req.body.name,

        designation:
          req.body.designation,

        email:
          req.body.email,

        contactNumber:
          req.body.contactNumber,

        city:
          req.body.city,

      };

      if (req.file) {

        updatedData.profileImage =
          req.file.filename;

      }

      await Admin.findByIdAndUpdate(

        req.params.id,

        updatedData

      );

      res.json({

        message:
          "Profile Updated Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);

export default router;