const express = require("express");
const app = express();
const mongoDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

mongoDB()
  .then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
      console.log("Successfully listened on the port 3000");
    });
  })
  .catch((err) => {
    console.log("Database is not connected :", err);
  });