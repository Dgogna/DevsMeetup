const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

const GET_POPULATED_COL = "firstName lastName about";

// Get all the pending requests for the loggen in user

router.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const recievedRequests = await connectionRequest
      .find({
        toUserId: loggedInUser,
        status: "interested",
      })
      .populate("fromUserId", GET_POPULATED_COL);

    res.status(200).json({
      message: "Fetched requests",
      data: recievedRequests,
    });
  } catch (error) {
    res.send(error);
  }
});

// Get your all the connections
// the connections can be like you have send the request and the opeher person has accepted it
// The other person have send the request and you have accepted it
router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", GET_POPULATED_COL)
      .populate("toUserId", GET_POPULATED_COL);

    const sanitizedData = connections.map((connection) => {
      if (loggedInUser._id.equals(connection.toUserId._id)) {
        return connection.fromUserId;
      }
      return connection.toUserId;
    });

    res.json({
      data: sanitizedData,
    });
  } catch (error) {
    res.send(error);
  }
});

// get the feed for the particular user
router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 500 ? 10 : limit;

    const skip = (page - 1) * limit;

    // console.log(loggedInUser);

    const seenConnectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const skipUserIds = new Set();

    seenConnectionRequests.map((connection) => {
      skipUserIds.add(connection.toUserId.toString());
      skipUserIds.add(connection.fromUserId.toString());
    });

    // Now i want all the users except with the Ids present in skipUserIds and it's own userId
    const userFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(skipUserIds) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(GET_POPULATED_COL)
      .skip(skip)
      .limit(limit);

    res.send(userFeed);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
