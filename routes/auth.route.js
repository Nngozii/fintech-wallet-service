const express = require("express");

const { signUp, logIn } = require("../controllers/auth.controller");
const signupSchema = require("../validators/auth.validator").signupSchema;
const loginSchema = require("../validators/auth.validator").loginSchema;
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const router = express.Router();

router.post("/signup", validator.body(signupSchema), signUp);
router.post("/login", validator.body(loginSchema), logIn);

module.exports = router;
