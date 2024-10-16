const express = require("express");
const app = express();
const mongoDB = require("./config/database");
const User = require("./model/user");

mongoDB()
    .then(() => {
        console.log("Database is connected");
        app.listen(3000, () => {
            console.log("Successfully listened on the port 3000");
        })
    })
    .catch((err) => {
        console.log("Database is not connected :", err);
    })

app.use(express.json());

app.get("/sign-up", async (req, res) => {
    
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added succeddfully.");
    } catch (err){
        res.status(400).message("Something went wrong: ", err.message);
    }
    
})