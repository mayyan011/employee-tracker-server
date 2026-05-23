import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },

    designation: {
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

    contactNumber: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model(
  "Employee",
  employeeSchema
);

export default Employee;