const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  try {
    // Validate the request.body
    validateSignUpData(req);

    const { password } = req.body;

    // at this point we have all the values valideted by our custom validator function

    // encrypt the password
    const passHash = await bcrypt.hash(password, saltRounds);

    const userToAdd = new User({ ...req.body, password: passHash });

    await userToAdd.save();

    res.send("User added successfully");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // check if the user is present with that email or not
    const user = await User.findOne({ emailId: emailId });
    //  // //console.log(user);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Now i have to comapre the passwords with that preseint in the DB
    const passwordIsValid = await user.validatePassword(password);
    //  // //console.log(userIsFound);
    if (passwordIsValid) {
      //  // //console.log(user._id)
      // I can also get this JWT sign with the schema methods
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 24 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { token } = req.cookies;

    res.clearCookie("token", token);
    res.send("User id logged out successfully");
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

module.exports = router;
