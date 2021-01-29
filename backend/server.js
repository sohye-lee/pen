import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routers/blogRouter.js';
import followRouter from './routers/followRouter.js';
import indexRouter from './routers/indexRouter.js';
import postingRouter from './routers/postingRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/pen', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get('/', (req, res) => {
    res.send('Server is on service!');
})
app.use('/index', indexRouter);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/postings', postingRouter);
app.use('/follows', followRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is ready at http://localhost:${port}`);
});