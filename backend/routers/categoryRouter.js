import express from 'express';
import Category from '../models/category.js';

const categoryRouter = express.Router();

categoryRouter.route('/')
.get((req,res,next) => {
    Category.find()
    .then(categories => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    })
    .catch(err => next(err))
})
.post((req,res,next) => {
    Category.create({
        name: req.body.name
    })
    .then(category => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(category)
    })
    .catch(err => next(err));
})

categoryRouter.route('/:categoryId')
.delete((req,res,next) => {
    Category.findByIdAndDelete(req.params.categoryId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'appliaction/json');
        res.json(response);
    })
    .catch(err => next(err));
})

export default categoryRouter;