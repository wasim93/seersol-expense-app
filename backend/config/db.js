import chalk from 'chalk';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      chalk.white.bgMagenta.bold`MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(chalk.red.bold.underline`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
