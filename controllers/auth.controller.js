const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const errorHandler = require("../utilities/error");

exports.signUp = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  let existingUser = await User.findOne({ email });
  try {
    if (existingUser) {
      next(errorHandler(409, "User already exists. Please log in!"));
    }
    let hashedPassword = bcrypt.hashSync(password, 10);

    let user = new User({
      email: email,
      password: hashedPassword,
    });
    let wallet = new Wallet({
      userId: user,
      balance: 0,
    });

    await user.save();
    await wallet.save();
    res.status(200).json({
      success: true,
      "status code": 200,
      message: "User Created Successfully",
    });
  } catch (err) {
    res.send(err);
  }
};

exports.logIn = async (req, res, next) => {};
