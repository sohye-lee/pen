import express from 'express';
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
    console.log('Server is now in service!')
    res.render('index', { title: 'Home' });
})

export default indexRouter;

