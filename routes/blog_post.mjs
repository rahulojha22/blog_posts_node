import express from "express";
import { Blog } from "../models/Blogs.mjs";
import { authentication } from "../middlewares/authentication.mjs";

export const blog_router = express.Router();

blog_router.post('/add_blog', authentication, async (req, res)=>{
    const {title, description, category, status} = req.body;
    try {
        const blogPost = new Blog({title, description, category, status});
        await blogPost.save();
        res.status(200).json({success: true, msg: 'blog saved'});
    } catch (error) {
        res.status(400).json({success: false, msg: 'error'});
    }
});

blog_router.get('/get_blogs', authentication, async(req, res)=>{
    try {
        const user = req.user;
        const blogPosts = await Blog.find({userId: user._id});        
        res.status(200).json({success: true, msg: 'blog saved', data: blogPosts});
    } catch (error) {
        res.status(400).json({success: false, msg: 'error'});
    }
});

blog_router.put('/edit_blog/:id', authentication, async(req, res)=>{
    const {title, description, category, status} = req.body;
    try {
        const blogPost = await Blog.findById(req.params.id)
        if(!blogPost){
            res.status(400).json({success: false, msg: 'blog not found'});
        }
        blogPost.title = title;
        blogPost.description = description;
        blogPost.category = category;
        blogPost.status = status;
        await blogPost.save();
        res.status(200).json({success: true, msg: 'blog edited'});
    }  catch (error) {
        res.status(400).json({success: false, msg: 'error'});
    }
});

blog_router.delete('/delete_blog/:id', authentication, async(req, res)=>{
    try {        
        const blogPost = await Blog.findById(req.params.id)
        if(!blogPost){
            res.status(400).json({success: false, msg: 'blog not found'});
        }
        await blogPost.remove();
        res.status(200).json({success: true, msg: 'blog deleted'});
    } catch (error) {
        res.status(400).json({success: false, msg: 'error'});
    }
});