const express = require("express");
const app = express();
const mongoDB = require("./config/database");
const User = require("./model/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

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

app.use(express.json());

app.post("/sign-up", async (req, res) => {

  validateSignupData(req);

  const user = new User(req.body);
  try {
    await user.save();
    return res.send("User added succeddfully.");
  } catch (err) {
    return res.status(400).send("Something went wrong: " + err.message);
  }
});

app.delete("/delete-user", async (req, res) => {
  try {
    const _id = req.body._id;
    await User.findByIdAndDelete({ _id });
    console.log("User deleted successfully");
  } catch (error) {
    return res.status(404).send("Something went wrong" + error.message);
  }
});

app.patch("/update-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES =[
      "firstName",
      "lastName",
      "password",
      "age",
      "gender"
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>{
      return ALLOWED_UPDATES.includes(k);
    });
    if(!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    await User.findByIdAndUpdate({ _id: userId }, data);
  } catch (error) {
    return res.status(404).send("Something went wrong:" + error.message);
  }
});

app.get("/find-user-by-email", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
