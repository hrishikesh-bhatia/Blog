const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authroutes = require('./routes/authroutes');
const blogroutes = require('./routes/blogroutes');

mongoose.connect('mongodb://localhost:27017/blogsmith')
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
app.use(express.static('public'));

// Routes
app.use('/api/auth', authroutes);
app.use('/api/blogs', blogroutes);

const PORT = 5000; // You can change this to any port you prefer
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
