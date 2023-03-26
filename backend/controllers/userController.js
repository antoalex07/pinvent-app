const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");

const registerUser = asyncHandler( async (req, res) => {
    
    const {name, email, password} = req.body;

    //Validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all the required fields");
    }

    if(password.length < 6){
        res.status(400);
        throw new Error("Password must be atleast 6 characters");
    }

    //Validate email
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if(!validateEmail(email)){
        res.status(400);
        throw new Error("Invalid email Please enter again");
    }
    
    //Checks for same email in already existing accounts
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("Account already exists for this mail id")
    }

    //Encrypt password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    //Create new User
    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    } else {
        res.status(400);
        throw new Error("Invalid User data");
    }
});

module.exports = {
    registerUser,
};