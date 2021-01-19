import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routers/blogRouter.js';
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
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/postings', postingRouter);

const api = "https://www.googleapis.com/books/v1/volumes?q=life&key=AIzaSyB1_TMxDx-VWJXLq9AmeTmFIf07BFghSx8"

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is ready at http://localhost:${port}`);
});