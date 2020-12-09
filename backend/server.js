import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chalk from 'chalk';
import morgan from 'morgan';
import expenseRoutes from './routes/expenseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// if (process.env.NODE_ENV === 'DEVELOPMENT') {
//   app.use(morgan('dev'));
// }

app.use(
  morgan(function (tokens, req, res) {
    return (
      chalk.blue(tokens.method(req, res)) +
      ' ' +
      chalk.green(tokens.url(req, res)) +
      ' ' +
      chalk.red(tokens['response-time'](req, res)) +
      ' ' +
      chalk.magenta(tokens.date(req, res))
    );
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    chalk.whiteBright.bgBlue.bold
      .underline`Server is running in ${process.env.NODE_ENV} MODE on port ${PORT}`
  )
);
