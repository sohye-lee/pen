import mongoose, { mongo } from 'mongoose';

const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


const postingSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    hashtags: {
        type: [String],
        default: []
    },
    comments: [commentSchema]
},
{
    timestamps: true
});

const Posting = mongoose.model('Posting', postingSchema);

export default Posting;