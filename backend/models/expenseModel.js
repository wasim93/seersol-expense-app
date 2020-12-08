import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
