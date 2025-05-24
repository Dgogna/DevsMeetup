

const express = require("express");
const { userAuth } = require("../middlewares/auth")
const User = require("../models/user")
const bcrypt = require("bcrypt");

const { validateProfileEditRequest } = require("../utils/validation");


const router = express.Router();
const saltRounds = 10;

router.get("/profile/view", userAuth, async (req, res) => {
    try {

        // Here we should be able to read the cookie;
        // console.log(req.cookies);
        const { user } = req;
        res.send(user)

    } catch (error) {
        res.send(error.message);
    }
})

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        const user = req.user;
        const { _id } = user;
        // we have to validate all the data commin in the req.body
        /**
         * Should get the array of fields which are editable. should edit them only
         */
        validateProfileEditRequest(req);
        // Data is verified then we can somply update the user.

        const updatedData = req.body;

        const updateduser = await User.findByIdAndUpdate({ _id }, updatedData, { runValidators: true });

        res.send("User id updated successfully");


    } catch (error) {
        res.send("ERROR: " + error.message);
    }
})

router.patch("/profile/password", userAuth, async (req, res) => {
    try {

        const { password } = req.body;
        const user = req.user;
        const {_id} = user;
        // console.log(user);

        // I have to create the JWT of this new password and updated in DB
        const passHash = await bcrypt.hash(password, saltRounds);
        // console.log(passHash)

        const temp = { ...user };
        
        const updatedObj = {password:passHash}      


        const newUser = await User.findByIdAndUpdate(_id,updatedObj , {runValidators:true});
        console.log(newUser);
        res.send("Password is updated successfuully");

    } catch (error) {
        res.send("ERROR: " + error.message)
    }
})

module.exports = router;