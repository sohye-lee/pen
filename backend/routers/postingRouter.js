import express from 'express';
import Posting from '../models/posting.js';

const postingRouter = express.Router();

postingRouter.route('/')
.get((req,res,next) => {
    Posting.find()
    .populate('author')
    .populate('blog')
    .populate('comments.author')
    .then(postings => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(postings);
    })
})
.post((req,res,next) => {
    Posting.create(req.body)
    .populate('author')
    .populate('blog')
    .then(posting => {
        console.log('New Posting Created ', posting);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting);
    })
    .catch(err => next(err));
});

postingRouter.route('/:postingId')
.get((req,res,next) => {
    Posting.findById(req.params.postingId)
    .populate('author')
    .populate('blog')
    .populate('comments.author')
    .then(posting => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting);
    })
    .catch(err => next(err));
})
.put((req,res,next) => {
    Posting.findByIdAndUpdate(req.params.postingId, {
        $set: req.body
    }, { new: true })
    .then(posting => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting);
    })
    .catch(err => next(err));
})
.delete((req,res,next) => {
    Posting.findByIdAndDelete(req.params.postingId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})


export default postingRouter;