import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export { getUsers };
