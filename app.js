const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/authroutes');
const blogroutes = require('./routes/blogroutes');
const requireAuth = require('./middleware/authmiddleware');  // Import the requireAuth middleware
const path = require('path');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));  // Serve static files from the 'public' folder

// Routes
app.use('/api/auth', authroutes);
app.use('/api/blogs', blogroutes);

// Protected Dashboard Route
app.get('/dashboard', requireAuth, (req, res) => {
  // Serve the dashboard page only if authenticated
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/newblog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'newblog.html'));
});
app.get('/articles', requireAuth, (req, res) => {
  // Serve the dashboard page only if authenticated
  res.sendFile(path.join(__dirname, 'public', 'allblogs.html'));
});
app.get('/explore', requireAuth, (req, res) => {
  // Serve the dashboard page only if authenticated
  res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
