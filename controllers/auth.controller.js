const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    user.walletId = wallet._id
    await user.save(wallet._id);
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

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Check if user exists
    let user = await User.findOne({ email });

    //if not, ask for signup
    if (!user) {
      return next(errorHandler(409, "User does not exist. Please Sign up."));
    }

    //check if passwords match
    let matchingPassword = bcrypt.compareSync(password, user.password);

    if (!matchingPassword) {
      return next(errorHandler(409, "Incorrect Password"));
    }

    //jwt
    const token = jwt.sign(
      {
        iat: Math.floor(Date.now()),
        sub: user._id,
        walletID: user.walletId
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login Successful", token: token });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};
