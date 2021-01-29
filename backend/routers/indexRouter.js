import express from 'express';
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
})

export default indexRouter;

