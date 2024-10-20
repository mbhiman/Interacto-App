const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if(!token) {
            throw new Error("Invalid Token");    
        }

        const decodedObj = await jwt.verify(token, "DevTinder@2001");
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not found!");   
        }

        req.user = user;
        next();

    } catch (error) { 
        res.status(404).send("Something went wrong" + error.message);
    }
};

module.exports = { userAuth };
