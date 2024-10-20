const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter correct email "+ value);             
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // select: false,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password.");
                
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender must be male/female/others");
            }
        }
    },
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DevTinder@2001");
    return token;
}

userSchema.methods.validatePassword = async function (passowrdInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isValidPassword = await bycrpt.compare(passowrdInputByUser, passwordHash);
    return isValidPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;