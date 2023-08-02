const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Static Sign Up method - Custom Signup method created for signing in users by me

userSchema.statics.signup = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error(" Not a Valid Email id ");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(" Password Must be strong ");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//Static login method for logging in the users

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error(" All Fields must be filled ");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error(" Email not registered ");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error(" Invalid Password ");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
