import express from 'express';
const router = express.Router();
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from '../controllers/expenseController.js';

router.route('/').get(getExpenses).post(addExpense);

router.route('/:id').delete(deleteExpense).put(updateExpense);

export default router;
