import express from 'express';
const router = express.Router();
import {
  addExpense,
  getExpenses,
  deleteExpense,
} from '../controllers/expenseController.js';

router.route('/').get(getExpenses).post(addExpense);

router.route('/:id').delete(deleteExpense);

export default router;
