
const express = require("express");
const {userAuth} = require("../middlewares/auth")


const router = express.Router();


router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user.firstName + " " + user.lastName + " is sending the connection request");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;