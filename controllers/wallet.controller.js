const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");

exports.getWallet = async (req, res, next) => {
  const userId = req.user.sub;
  const wallet = await Wallet.findById(req.user.walletID);
  const transactions = await Transaction.find({ userId });

  if (!wallet) {
  return res.status(404).json({
    message: "Wallet not found for this user"
  });
}

  if (transactions.length === 0) {
    return res.status(200).json({
      user: wallet.userId,
      balance: wallet.balance,
      status: wallet.status,
      transactionLog: [],
      message: "No Transaction Record",
    });
  }

  return res.status(200).json({
    user: wallet.userId,
    balance: wallet.balance,
    status: wallet.status,
    transactionLog: transactions,
  });
};
