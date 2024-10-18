const validator = require('validator');

const validateSignupData = (req) => {

    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter a valid name");

    } else if( firstName.minLength <3 || firstName.maxlength >30){
        throw new Error("First name should be within 3-30 words");

    } else if(lastName.minLength <3 || lastName.maxlength >30){
        throw new Error("Last name should be within 3-30 words");
        
    } else if(!validator.isEmail(email)){
        throw new Error("Enter a valid email");
        
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
        
    }
}

module.exports = { validateSignupData};