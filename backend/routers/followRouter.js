import express from 'express';
import Follow from '../models/follow.js';
import { isAuth } from '../utils.js';

const followRouter = express.Router();

followRouter.route('/')
.get((req, res, next) => {
    Follow.find()
    .then(follows => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(follows);
    })
    .catch(err => next(err));
})
.post(isAuth, (req, res, next) => {
    Follow.findOne({ user: req.body.user })
    .then(follow => {
        if (!follow) {
            Follow.create(req.body)
            .then(follow => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(follow);
            })
            .catch(err => next(err));
        } else if (follow && !follow.blogs.includes(req.body.blog)) {
            follow.blogs.push(req.body.blog);
            follow.save()
            .then(follow => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(follow);
            })
        } else if (follow && follow.blogs.includes(req.body.blog)) {
            res.setStatusCode = 200;
            res.end('You are already following!')
        }
    })
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported');
})
.delete((req,res,next) => {
    Follow.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(response);
    })
    .catch(err => next(err));
})

// .delete((req, res, next) => {
//     Follow.findOneAndDelete({ user: req.user._id })
//     .then(response => {
//        res.statusCode = 200;
//        res.setHeader('Content-Type','application/json');
//        res.json(response);
//        console.log(`All follows of ${user.firstname} have been unfollowed.`)
//     })
// });

followRouter.route('/:blogId')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end(`The operation not supported on /follows/${blogId}`);
})
.post((req, res, next) => {
    Follow.findOne({ user: req.body.user })
    .then(follow => {
        if (follow) {
            if (follow.blogs.filter(blog => blog._id.includes(req.params.blogId)) === []) {
                follow.blogs.push(req.params.blogId);
                follow.save()
                .then(follow => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(follow);
                })
                .catch(err => next(err));
            } else {
                const followingBlog = Blog.findById(req.params.blogId);
                res.statusCode = 200;
                res.end(`You are already following blog ${followingBlog.name}`)
            }
        } else {
            Follow.create({
                user: req.user._id,
                blogs: [req.params.blogId]
            })
        }
    })
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /follows/${req.params.blogId}`);
})

followRouter.route('/:userId/:blogId')
.delete((req, res, next) => {
    Follow.findOne({ user: req.params.userId })
    .then(follow => {
        if (follow) {
            const blogList = follow.blogs.filter(blog => blog.toString() !== req.params.blogId);
            follow.blogs = blogList;
            follow.save()
            .then((follow) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(follow);
            })
            .catch(err => next(Err));
        } else {
            res.statusCode = 403;
            res.end('You are not following any blog.');
        }
    })
    .catch(err => next(err));
})

export default followRouter;