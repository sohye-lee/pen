import mongoose from 'mongoose';

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
    category: {
        type: String,
        required: true
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
    comments: [commentSchema],
    featured: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const Posting = mongoose.model('Posting', postingSchema);

export default Posting;