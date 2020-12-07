import expressAsyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';

// @desc Add an expense
// @route POST /api/expenses
// @access Private
const addExpense = expressAsyncHandler(async (req, res) => {
  const { description, amount, paidBy } = req.body;

  const expense = await Expense.create({
    description,
    amount,
    paidBy,
  });

  if (expense) {
    const addedExpense = await expense.save();
    res.status(201).json(addedExpense);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = expressAsyncHandler(async (req, res) => {
  const expenses = await Expense.find({});
  res.json(expenses);
});

// @desc    Delete Expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = expressAsyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    await expense.remove();
    res.json({ message: 'Expense Deleted' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

export { addExpense, getExpenses, deleteExpense };
