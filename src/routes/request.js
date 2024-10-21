const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/connection-request", userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send("Connection request sent by " + user.firstName);

    } catch (error) {
        res.status(404).send("Something went wrong: " + error.message);
    }
})

module.exports = requestRouter;