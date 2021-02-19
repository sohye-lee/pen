import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';

import indexRouter from './routers/indexRouter.js';
import blogRouter from './routers/blogRouter.js';
import followRouter from './routers/followRouter.js';
import postingRouter from './routers/postingRouter.js';
import userRouter from './routers/userRouter.js';
import imageRouter from './routers/imageRouter.js'
import { config } from './config.js';
import categoryRouter from './routers/categoryRouter.js';

const url = config.mongoUrl;
const connect = mongoose.connect(url || 'mongodb://localhost:27017/pen', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connect.then(() => console.log('Server connected successfully!'),
    err => console.log(err)
);

const app = express();

// SECURE TRAFFICS 
// app.all('*', (req, res, next) => {
//     if (req.secure) {
//         return next();
//     } else {
//         console.log(`Redirecting to : http://${req.hostname}:${app.get('secPort')}${req.url}`);
//         res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
//     }
// })

// VIEW ENGINE SETUP
app.set('view engine', 'jade'); 
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/images')))
// app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req,res) => 
//     res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
app.use('/index', indexRouter);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/postings', postingRouter);
app.use('/follows', followRouter);
app.use('/images', imageRouter);
app.use('/categories', categoryRouter);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
    next(createError(404));
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is ready at http://localhost:${port}`);
});

