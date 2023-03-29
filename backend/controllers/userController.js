const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

//Register new User
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
    
    //Checks for same email in already existing accounts
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("Account already exists for this mail id")
    }

    //Create new User
    const user = await User.create({
        name,
        email,
        password,
    });

    //Generate Token
    const token = generateToken(user._id); 

    //send HTTP-only cookie
    res.cookie("token", "token", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 100 * 86400),
        sameSite: "none",
    });

    console.log('Cookie set:', req.cookies);
   // res.send("cookie send successfully");

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400);
        throw new Error("Invalid User data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password");
    }

    const user = await User.findOne({email});

    if(!user){
        res.status(400);
        throw new Error("User not found, Please signup");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    const token = generateToken(user._id); 

    //send HTTP-only cookie
    res.cookie("token", "token", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 100 * 86400),
        sameSite: "none",
    });

    if(user && passwordIsCorrect){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        });
    }else{
        res.status(400);
        throw new Error("Invalid email or Password");
    }

});

const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
    });
    return res.status(200).json({ message: "Successfully logged out" });
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(200).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400);
        throw new Error("Invalid User data");
    }
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
};