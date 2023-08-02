const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// _id as mongodb stores id as _id
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Create a new token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
};

//sign up user

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //Create new Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
