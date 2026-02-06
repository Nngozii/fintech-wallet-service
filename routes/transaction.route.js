const express = require("express");

const verifyToken = require("../middlewares/verify");
const {
  deposit,
  transfer,
  withdraw,
} = require("../controllers/transaction.controller");
const {
  depositSchema,
  transferSchema,
  withdrawSchema,
} = require("../validators/transaction.validator");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const router = express.Router();

router.post("/deposit", verifyToken, validator.body(depositSchema), deposit);
router.post("/withdraw", verifyToken, validator.body(withdrawSchema), withdraw);
router.post("/transfer", verifyToken, validator.body(transferSchema), transfer);

module.exports = router;
