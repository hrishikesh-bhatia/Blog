const express = require('express');
const router = express.Router();

const { createBlog, getBlog, getBlogById, updateBlog, deleteBlog , getBlogByCategory} = require('../controllers/blogcontroller');
const requireAuth = require('../middleware/authmiddleware');

// All routes below require authentication
router.use(requireAuth);

router.post('/create', createBlog);
router.get('/getallblogs', getBlog);
router.get('/get/:id', getBlogById);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);
router.get('/category/:category',getBlogByCategory);
module.exports = router;
