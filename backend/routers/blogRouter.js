import express from 'express';
import Blog from '../models/blog.js';

const blogRouter = express.Router();

blogRouter.route('/')
.get((req,res,next) => {
    Blog.find({})
    .populate('author')
    .then(blogs => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    })
    .catch(err => next(err));
})
.post((req,res,next) => {
    Blog.create({
        author: req.body.author,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        featured: req.body.featured || false
    })
    .then(blog => {
        console.log('Blog Created : ', blog);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    })
    .catch(err => next(err));
})
.delete((req,res,next) => {
    Blog.deleteMany()
    .then(response => {
        console.log(`All ${response.deletedCount} blogs deleted!`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

blogRouter.route('/:blogId')
.get((req,res,next) => {
    Blog.findById(req.params.blogId)
    .populate('author')
    .then(blog => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    })
    .catch(err => next(err));
})
.put((req,res,next) => {
    Blog.findByIdAndUpdate(req.params.blogId, {
        $set: req.body
    }, { new: true })
    .then(blog => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    })
    .catch(err => next(err));
})
.delete((req,res,next) => {
    Blog.findOneAndDelete(req.params.blogId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

export default blogRouter;