import express from 'express';
import Posting from '../models/posting.js';
import { isAdmin, isAuth } from '../utils.js';


const postingRouter = express.Router();

postingRouter.route('/')
.get((req,res,next) => {
    Posting.find()
    .populate('author')
    .populate('blog')
    .populate('category')
    .populate('comments.author')
    .then(postings => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(postings);
    })
})
.post((req,res,next) => {
    Posting.create(req.body)
    // .populate('author')
    // .populate('blog')
    .then(posting => {
        console.log('New Posting Created ', posting);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting);
    })
    .catch(err => next(err));
})
.delete(isAuth, isAdmin, (req,res,next) => {
    Posting.deleteMany()
    .then(response => {
        console.log('All postings delete');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
   .catch(err => next(err));
});

postingRouter.route('/:postingId')
.get((req,res,next) => {
    Posting.findById(req.params.postingId)
    .populate('author')
    .populate('blog')
    .populate('comments.author')
    .populate('category')
    .then(posting => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting);
    })
    .catch(err => next(err));
})
.put(isAuth, isAdmin, (req,res,next) => {
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
.delete(isAuth, isAdmin, (req,res,next) => {
    Posting.findByIdAndDelete(req.params.postingId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

postingRouter.route('/:postingId/comments')
.get((req, res, next) => {
    Posting.findById(req.params.postingId)
    .populate('comments.author')
    .then(posting => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posting.comments);
    })
    .catch(err => next(err));
})
.post(isAuth, (req, res, next) => {
    Posting.findById(req.params.postingId)
    .then(posting => {
        posting.comments.push({
            author: req.user._id,
            text: req.body.text
        });
        posting.save()
        .then(posting => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(posting);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

postingRouter.route('/:postingId/comments/:commentId')
.get((req, res, next) => {
    Posting.findById(req.params.postingId)
    .populate('comments.author')
    .then(posting => {
        if (posting && posting.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(posting.comments.id(req.params.commentId));
        } else if (!posting ) {
            err = new Error(`Posting ${req.params.postingId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(isAuth, (req, res, next) => {
    Posting.findById(req.params.postingId)
    .then(posting => {
        posting.comments.id(req.params.commentId).text = req.body.text;
        posting.save()
        .then(posting => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(posting);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err))
})
.delete(isAuth, (req, res, next) => {
    Posting.findById(req.params.postingId)
    .then(posting => {
        posting.comments.id(req.params.commentId).remove();
        posting.save()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response)
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

postingRouter.route('/:postingId/liked')
.put((req, res, next) => {
    Posting.findById(req.params.postingId)
    .then(posting => {
        if (!posting.liked.includes(req.body.userId)) {
            posting.liked.push(req.body.userId);
            posting.save()
            .then(posting => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posting);
            })
            .catch(err => next(err));
        } else {
            posting.liked = posting.liked.filter(like => like !== req.body.userId);
            posting.save()
            .then(posting => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posting);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})

export default postingRouter;