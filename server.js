const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION. Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('DB Connection Succeful!');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`I love you ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.error('UNHANDLER REJECTION Shuting down...');

  server.close(() => {
    // Close the server then shutdown tha application
    process.exit(1); // 1 is for uncought exception and 0 is for success
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIEVED. Sutting down');
  server.close(() => {
    console.log('Process terminated!');
  });
});
