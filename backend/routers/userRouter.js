import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.route('/')
.get(isAuth, isAdmin, (req,res,next) => {
    User.find()
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})
.delete(isAuth, isAdmin, (req,res,next) => {
    User.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
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
        console.log('User Registered : ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        });
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
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
            } else {
                res.statusCode = 401;
                throw new Error("Password invalid. Please try again")
            
            }
        } else {
            res.statusCode = 404;
            res.end('User not found.');
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
.put(isAuth, (req,res,next) => {
    User.findById(req.body.userId)
    .then(user => {
        if (user) {
            user.username = req.body.username || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            user.image = req.body.image || user.image;
            user.introduction = req.body.introduction || user.introduction;
        };
        user.save()
        .then(user => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
                introduction: user.introduction,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
})
.delete(isAuth, (req,res,next) => {
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