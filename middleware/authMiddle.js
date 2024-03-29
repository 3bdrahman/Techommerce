const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddle = asyncHandler(async (req, res, next) => {
	let token;
	if (req?.headers?.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
		try {
			if (token) {
				const decoded = jwt.verify(token, process.env.JWT_CODE);
				const user = await User.findById(decoded?.id);
				req.user = user;
				next();
			}
		} catch (err) {
			throw new Error('NOT Authorized token expired, Please log in again');
		}
	} else {
		throw new Error('there is no token attached to the header');
	}
});
const isAdmin = asyncHandler(async (req, res, next) => {
	const { email } = req.user;
	const adminUser = await User.findOne({ email });
	if (adminUser.role !== 'admin') {
		throw new Error('You are not an admin');
	} else {
		next();
	}
});
module.exports = { authMiddle, isAdmin };
