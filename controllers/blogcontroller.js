const Blog = require('../models/blog.js');

const createBlog = async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const newBlog = new Blog({
            title,
            content,
            author: req.userid, // This comes from the JWT via middleware
            createdAt: new Date()
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

const getBlog = async (req,res) =>{
    try{
        const allblogs = await Blog.find({})
        res.json({allblogs})
    }
    catch ( error ){
        res.status(500).json({message : 'Error providing all blogs'})
    }
}

const getBlogById = async (req,res) =>{
    try{
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
    } catch(error){
        res.status(500).json({message : 'Error getting the blog'})
    }
}

const updateBlog = async (req,res) =>{
    try{
    const {id} = req.params
    const blog = await Blog.findById(id);
    if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
    }
    if(blog.author.toString() != req.userid){
        return res.status(403).json({message : 'Forbidden Access'})
    }
    const {title , content} = req.body
    if(!title || !content){
        return res.status(400).json({message: ' No Update Provided'})
    }
    blog.title = title
    blog.content = content

    await blog.save()
    res.status(200).json({blog})
    } catch(error){
        res.status(500).json({message : 'Error Updating the Blog'})
    }
}

const deleteBlog = async (req,res) =>{
    try{
    const {id} = req.params
    const blog = await Blog.findById(id);
    if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
    }
    if(blog.author.toString() != req.userid){
        return res.status(403).json({message : 'Forbidden Access'})
    }
    await Blog.findByIdAndDelete(id)

    
    res.status(200).json({message : ' Blog deleted successfully'})
    } catch(error){
        res.status(500).json({message : 'Error deleting the Blog'})
    }
}