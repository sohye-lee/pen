import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
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