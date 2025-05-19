const Blog = require('../models/blog.js');
const User = require('../models/user');

const createBlog = async (req, res) => {
    const { title, content, category, image } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const user = await User.findById(req.user.userid);

    // 2. Handle case if user is not found
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const newBlog = new Blog({
            title,
            content,
            category,
            image,
            author: user.username, // This comes from the JWT via middleware
            createdAt: new Date()
        });

        await newBlog.save();
        console.log("User ID from JWT:", user.username);

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

const getBlog = async (req, res) => {
    try {
        const allblogs = await Blog.find({})
        res.json({ data: allblogs })
    }
    catch (error) {
        res.status(500).json({ message: 'Error providing all blogs' })
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({blog});
    } catch (error) {
        res.status(500).json({ message: 'Error getting the blog' })
    }
}
const getBlogByCategory = async(req,res) => {
    try {
    const {category} = req.params;
    const blogs = await Blog.find(category === "All" ? {} : { category }); // If All, return all blogs
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs by category" });
  }
}
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author.toString() != req.userid) {
            return res.status(403).json({ message: 'Forbidden Access' })
        }
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: ' No Update Provided' })
        }
        blog.title = title
        blog.content = content

        await blog.save()
        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ message: 'Error Updating the Blog' })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author.toString() != req.userid) {
            return res.status(403).json({ message: 'Forbidden Access' })
        }
        await Blog.findByIdAndDelete(id)


        res.status(200).json({ message: ' Blog deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the Blog' })
    }
}

module.exports = { createBlog, getBlog, getBlogById,getBlogByCategory, updateBlog, deleteBlog }