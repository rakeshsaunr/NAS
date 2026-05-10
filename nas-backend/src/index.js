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
const { ProductModel } = require('./models');
const morganMiddleware = require('./utils/logger/morgan.logger');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use(morganMiddleware);
app.use('/api', apiRoutes);
app.use(errorHandler);

// Test routes
app.get('/', (req, res) => {
  return res.status(200).json({ message: "Successful Connection" });
});

app.get('/test', async (req, res) => {
  try {
    const category = await ProductModel.findById("68a9989cafa8da986fa36127");
    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});

// Connect to DB
DbConnection.connectDB();
