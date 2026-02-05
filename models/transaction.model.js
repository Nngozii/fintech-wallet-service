const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionModel = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },
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
      unique: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balanceBefore: {
      type: Number,
      required: true
    },
    balanceAfter: {
      type: Number,
      required: true
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
