const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/config');

dotenv.config(); // Load environment variables from .env file
connectDb(); // Connect to MongoDB database

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/patients", require("./routes/PatientRoutes"));

// Test route
app.get("/", (_req, res) => {
  res.send("<h1>BACKEND</h1>");
});

const PORT = process.env.PORT || 3002; // Use environment variable for port or default to 3002

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EACCES') {
    console.error(`Port ${PORT} requires elevated privileges. Try running the server with sudo or as an administrator.`);
  } else {
    console.error('Error starting server:', err);
  }
});
