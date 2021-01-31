import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const userRouter = express.Router();

userRouter.route('/')
.get((req,res,next) => {
    User.find()
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})

userRouter.route('/signup')
.post((req,res,next) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: req.body.isAdmin
    })
    .then(user => {
        // const createdUser = user.save();
        console.log('User Registered : ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err));
});

userRouter.route('/login')
.post((req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.statusCode = 200;
                res.send({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            }
        }
    })
    .catch(err => next(err));
});


userRouter.route('/:userId')
.get((req,res,next) => {
    User.findById(req.params.userId)
    .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err));
})
.put((req,res,next) => {
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true })
    .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err));
})
.delete((req,res,next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(response => {
        console.log('User Deleted')
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


export default userRouter;