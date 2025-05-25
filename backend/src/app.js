const express = require("express");
const { connectDB } = require("./config/database");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = 7070;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRoute = require("./routes/request");
const userRoute = require("./routes/user");

app.use("/", authRoute, profileRoute, requestRoute, userRoute);

connectDB()
  .then(() => {
    console.log("Database is successfully connected");
    app.listen(PORT, () => {
      console.log(`Server is up and running on PORT: ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Thre is some problem in the DB connection");
  });
