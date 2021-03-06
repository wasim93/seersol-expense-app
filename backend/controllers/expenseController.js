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
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Expense.countDocuments({});

  const expenses = await Expense.find({})
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ expenses, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Update Expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = expressAsyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.description = req.body.description || expense.description;
    expense.amount = req.body.amount || expense.amount;
    expense.paidBy = req.body.paidBy;

    const updatedExpense = await expense.save();

    res.json({
      _id: updatedExpense._id,
      description: updatedExpense.description,
      amount: updatedExpense.amount,
      paidBy: updatedExpense.paidBy,
    });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

export { addExpense, getExpenses, deleteExpense, updateExpense };
