import express from 'express';
import multer from 'multer';
import path from 'path';

const imageRouter = express.Router();

const storage = multer.diskStorage({
    destination (req, file, callback) {
        callback(null, 'images/');
    },
    filename (req, file, callback) {
        callback(null, file.originalname);
    },
})

// const fileFilter = (req, file, callback) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         callback(null, true);
//     } else {
//         callback(null, false);
//     }
// }

const upload = multer({ storage });

imageRouter.route('/')
.post(upload.single('image'), (req, res, next) => {
    res.send("/"+req.file.path);
});

export default imageRouter;