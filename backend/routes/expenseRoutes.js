import express from 'express';
const router = express.Router();

import { addExpense, getExpenses } from '../controllers/expenseController.js';

router.route('/').get(getExpenses).post(addExpense);

export default router;
