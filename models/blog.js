const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  
  image: {type: String, default:"https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"},
  category: {type: String, default: "Work and Life"},
  readTime: {type: String, default: "8 min read"},
  author: {type: String },
  date: {type: String, default: "May10, 2025"}


});

module.exports = mongoose.model('Blog', blogSchema);
//   {
//   title: "The Future of Remote Work and Digital Nomadism",
//   image: "https://...",
//   category: "Work & Life",
//   readTime: "8 min read",
//   excerpt: "Exploring how technology is reshaping...",
//   author: "Alex Morgan",
//   date: "May 10, 2025",
//   _id: "some-mongodb-id"
// }
// author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // createdAt:{ type: Date, default: Date.now },