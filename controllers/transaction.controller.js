const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");

exports.deposit = async (req, res, next) => {
  /* NOTE: next(errorHandler...) cannot be used inside mongodb transaction session.
  Throwing new error aborts the transaction automatically
  FIX: JWT Token don't expire
  */
  const { amount } = req.body;
  //Start MongoDB session for atomic update
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      //Read wallet within session to maintain transactional consistency and prevent stale reads
      const wallet = await Wallet.findById(req.user.walletID).session(session);

      if (!wallet) {
        throw new Error("Wallet not found");
      }
      //Prevent transaction on frozen wallets
      if (wallet.status !== "active") {
        throw new Error("Wallet is not active");
      }
      //Record balance before transaction
      let balanceBefore = wallet.balance;

      //Ledger entry for audit trails
      let transaction = new Transaction({
        userId: req.user.sub,
        transactionType: "fund",
        amount,
        recipient: wallet._id,
        balanceBefore,
        status: "pending",
        timestamp: new Date(),
      });

      //Atomic balance update
      wallet.balance += amount;
      await wallet.save({ session });
      //Balance after transaction
      transaction.balanceAfter = wallet.balance;

      transaction.status = "successful";
      await transaction.save({ session });
    });

    return res.status(200).send(`You have Successfully deposited ${amount}`);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      //stack: err.stack,
    });
  } finally {
    await session.endSession();
    console.log("session ended");
  }
};

exports.transfer = async (req, res, next) => {
  const { amount, recipient } = req.body;
  //Start MongoDB session for atomic update
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const wallet = await Wallet.findById(req.user.walletID).session(session);
      const recipientWallet = await Wallet.findById(recipient).session(session);

      if (!wallet) {
        throw new Error("Wallet not found");
      }
      if (!recipientWallet) {
        throw new Error("Recipient wallet not found");
      }
      if (wallet.status !== "active") {
        throw new Error("Wallet is not active");
      }
      if (recipientWallet.status !== "active") {
        throw new Error("Recipient wallet is not active");
      }
      if(wallet._id.equals(recipientWallet._id)){
        throw new Error("You cannot transfer to same wallet")
      }
      if (wallet.balance < amount) {
        throw new Error("Insufficient fund");
      }
      //Record balance before transaction
      let balanceBefore = wallet.balance;

      let transaction = new Transaction({
        userId: req.user.sub,
        transactionType: "transfer",
        amount,
        sender: wallet,
        recipient: recipientWallet._id,
        balanceBefore,
        status: "pending",
        timestamp: new Date(),
      });

      //Atomic balance update
      wallet.balance -= amount;
      recipientWallet.balance += amount;
      await wallet.save({ session });
      await recipientWallet.save({ session });
      //Balance after transaction
      transaction.balanceAfter = wallet.balance;

      transaction.status = "successful";
      await transaction.save({ session });
    });

    return res
      .status(200)
      .send(`You have Successfully sent ${amount} to ${recipient}`);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      //stack: err.stack,
    });
  } finally {
    await session.endSession();
    console.log("session ended");
  }
};

exports.withdraw = (req, res, next) => {};
