const express = require("express");

const verifyToken = require("../middlewares/verify");
const { getWallet } = require("../controllers/wallet.controller");

const router = express.Router();

router.get("/wallet", verifyToken, getWallet);

module.exports = router;
