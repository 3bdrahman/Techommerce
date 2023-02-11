const express = require('express')
const {
	createUser,
	loginUser,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
} = require('../controller/userCtrl');
const { authMiddle, isAdmin } = require('../middleware/authMiddle');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all-users', getAllUsers);
router.get('/:id', authMiddle, isAdmin, getUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddle, updateUser);
module.exports = router;