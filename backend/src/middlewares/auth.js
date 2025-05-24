const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtSecret = "helloJwtIt'sASecret";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("User is not logged in");
    }

    const { _id } = jwt.verify(token, jwtSecret);

    const user = await User.findById(_id);

    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("Please Login to continue furthur");
    }
  } catch (error) {
    res.status(403).send("ERROR: " + error.message);
  }
};

module.exports = { userAuth };
