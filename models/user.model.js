const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const userModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userModel);
