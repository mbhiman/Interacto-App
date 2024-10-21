const express = require('express');
const authRouter = express.Router();
const User = require("../model/user");
const bcrypt = require('bcrypt');
const { validateSignupData } = require("../utils/validation");

authRouter.post("/sign-up", async (req, res) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        await user.save();
        return res.send("User added succeddfully.");
    } catch (err) {
        return res.status(400).send("Something went wrong: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(" Invalid Credentials");
        }

        const isValidPassword = await user.validatePassword(password);

        if (isValidPassword) {
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send("Login successfully");
        } else {
            throw new Error(" Invalid Credentials");
        }
    } catch (error) {
        return res.status(404).send("Something went wrong: " + error.message);
    }
});

module.exports = authRouter;