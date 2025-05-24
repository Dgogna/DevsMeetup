const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

// I can now make a single request for the interested and the ignored route something like this.
router.post(
  "/request/send/:requestStatus/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;

      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.requestStatus;

      //   To send the connection reuest there should be only 2 allowed status interested and ignred

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.find((val) => val === status)) {
        throw new Error("In valid status of the request");
      }

      //   Check the person it want to send the request should be ppresent in the usersDB.
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        res.status(404).json({
          message: "The user in not present in DB",
        });
      }

      //   Same person should not be able to send the request to himself.
      if (fromUserId.equals(toUserId)) {
        throw new Error("You cannot request to yourself");
      }

      //   Before sending the connection request to other user we have to chekc 2 things
      // 1 If the same user have not requested to other user.
      // 2 if th other user have already recieved the connection request from the first user then he can't send back to him

      const isRequestPresent = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (!isRequestPresent) {
        const newConnectionRequest = await new ConnectionRequest({
          fromUserId,
          toUserId,
          status,
        });

        await newConnectionRequest.save();
        res.json({
          message: "connection request is send successfully",
          data: newConnectionRequest,
        });
      } else {
        throw new Error(
          "Cannot request to this persosn the request is already there"
        );
      }
    } catch (error) {
      res.send("Error: " + error.message);
    }
  }
);

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // the request status should be only accepted or rejected.
      // the request ID should be present in the DB.
      // The perseon reviewing the request (i.e logged in person) should be same as that of request ka to userID.
      // The status to the request that the user is reviewing should be only interested.

      const { status, requestId } = req.params;

      const validStatus = ["accepted", "rejected"];
      if (!validStatus.includes(status)) {
        return res.status(404).json({
          message: "You can only accept or reject this request",
        });
      }

      const currentLoggedInUserId = req.user._id;

      const isReqValid = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: currentLoggedInUserId,
        status: "interested",
      });

      if (!isReqValid) {
        return res.status(404).json({
          message: "You can not send this request",
        });
      }

      isReqValid.status = status;

      await isReqValid.save();

      res.json({
        message: `Your request is ${status}`,
        data: isReqValid,
      });
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
