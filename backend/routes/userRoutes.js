import express from 'express';
const router = express.Router();
import { getUsers } from '../controllers/userController.js';

router.route('/').get(getUsers);

export default router;
