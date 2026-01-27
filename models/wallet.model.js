const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletModel = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "frozen"],
      default: "active",
    },
    currency: {
      type: String,
      required: true,
      default: "NGN",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Wallet", walletModel);
