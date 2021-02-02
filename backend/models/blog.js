import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/noimage.jpg'
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;