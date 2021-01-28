import express from 'express';
import Follow from '../models/follow';

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
    Follow.find({ user: req.user._id })
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
            if (!follow.blogs.includes(req.user._id)) {
                follow.blogs.push(req.body._id);
                follow.save();
            }
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
    Follow.findOne({ user: req.user._id })
    .then(follow => {
        
    })
})