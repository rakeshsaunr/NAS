require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { DbConnection } = require('./config');
const apiRoutes = require('./routes');
const morganMiddleware = require('./utils/logger/morgan.logger');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://www.rakeshsaunr.in','https://portfolio-frontend-a7e.pages.dev'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use(morganMiddleware);
app.use('/api', apiRoutes);

// Custom validation error handler for Joi or other validation libraries
app.use((err, req, res, next) => {
  // Joi validation error
  if (err && err.isJoi) {
    const messages = err.details ? err.details.map(d => d.message) : [err.message];
    return res.status(400).json({ errors: messages });
  }
  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors: messages });
  }
  // Pass to default error handler
  next(err);
});

app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  return res.status(200).json({ message: "Successful Connection" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});

// Connect to DB
DbConnection.connectDB();
