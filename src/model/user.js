const mongoose = require("mongoose");

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
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false,
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

const User = mongoose.model("User", userSchema);

module.exports = User;