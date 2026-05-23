import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      default: "",
    },

    contactNumber: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "admin",
    },

  },

  {
    timestamps: true,
  }

);

const Admin = mongoose.model(
  "Admin",
  adminSchema
);

export default Admin;