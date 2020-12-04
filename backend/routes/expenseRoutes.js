import express from 'express';
const router = express.Router();

import { addExpense } from '../controllers/expenseController.js';

router.route('/').post(addExpense);

export default router;
