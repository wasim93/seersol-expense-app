import mongoose from 'mongoose';

import dotenv from 'dotenv';
import chalk from 'chalk';
import users from './data/users.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    console.log(chalk.yellowBright.bold`Data Imported!`);
  } catch (error) {
    console.log(chalk.bold.redBright`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log(chalk.redBright.bold`Data Destroyed!`);
  } catch (error) {
    console.log(chalk.bold.redBright`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
