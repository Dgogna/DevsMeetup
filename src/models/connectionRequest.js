const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "Value of status should be correct",
    },
  },
});

const connectionRequest = mongoose.model("ConnectionRequest", requestSchema);

module.exports = connectionRequest;
