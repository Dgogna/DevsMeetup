const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "helloJwtIt'sASecret";
const bcrypt = require("bcrypt");

const validateEmail = async (value) => {
  if (!validator.isEmail(value)) {
    throw new Error("The email should be in proper format");
  }
  const user = await User.findOne({ emailId: value });

  if (user)
    throw new Error("A user is already registered with this email address.");
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate: validateEmail,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("gender can be either male or female");
        }
      },
    },
    age: {
      type: Number,
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is my default description",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });
  // console.log(token);
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  // console.log("Comming in this function to validate the password")
  const passwordIsValid = await bcrypt.compare(password, user?.password);

  // console.log("Is paass valid or not " + passwordIsValid);

  return passwordIsValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
