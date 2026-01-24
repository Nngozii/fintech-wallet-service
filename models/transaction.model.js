const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const transactionModel = new Schema(
  {
    transactionType: {
      type: String,
      enum: ["transfer", "withdraw", "fund"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["successful", "pending", "failed"],
      required: true
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionModel);
