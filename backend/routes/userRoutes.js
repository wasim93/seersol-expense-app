import express from 'express';
const router = express.Router();
import {
  authUser,
  getUsers,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
