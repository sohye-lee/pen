import express from 'express';
import Follow from '../models/follow.js';

const followRouter = express.Router();

followRouter.route('/')
.get((req, res, next) => {
    Follow.findOne({ user: req.user._id })
    .then(follow => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(follow.blogs);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Follow.findOne({ user: req.user._id })
    .then(follow => {
        if (!follow) {
            Follow.create({
                user: req.user._id,
                blogs: [req.body._id]
            })
            .then(follow => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(follow);
                res.end('Follow created!');
            })
            .catch(err => next(err));
        } else {
            req.body.forEach(fol => {
                if (!follow.blogs.includes(fol._id)) {
                    follow.blogs.push(fol._id);
                }
            })
            follow.save()
            .then(follow => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(follow);
            })
        }
    })
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported');
})
.delete((req, res, next) => {
    Follow.findOneAndDelete({ user: req.user._id })
    .then(response => {
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(response);
       console.log(`All follows of ${user.firstname} have been unfollowed.`)
    })
});

followRouter.route('/:blogId')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end(`The operation not supported on /follows/${blogId}`);
})
.post((req, res, next) => {
    Follow.findOne({ user: req.user._id })
    .then(follow => {
        if (follow) {
            if (!follow.blogs.includes(req.params.blogId)) {
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
.delete((req, res, next) => {
    Follow.findOne({ user: req.user._id })
    .then(follow => {
        if (follow) {
            follow.blogs.filter(blog => blog.toString() !== req.params.blogId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(follow);
        } else {
            res.end('You are not following this blog.');
        }
    })
    .catch(err => next(err));
})

export default followRouter;