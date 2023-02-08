const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        // create new user
        const newUser =await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error('User Already Exits!')
    }
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if email exists
    const findUser = await User.findOne({ email: email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            togen: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
})
// get every user
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    }
    catch (err) {
        throw new Error(err)
    }
})

// get a specific user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById( id );
        res.json({user})
    }
    catch (err) {
        throw new Error(err);
    }
})

// remove a user
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		res.json({ deletedUser });
	} catch (err) {
		throw new Error(err);
	}
});

// update a user 
const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile
            },
            {
            new: true,
        });
        res.json(updateUser)        
    }
    catch (err) {
        throw new Error(err);
    }
})
module.exports = { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser}