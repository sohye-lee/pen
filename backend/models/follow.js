import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const followSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
},
{
    timestamps: true
});

const Follow = mongoose.model('Follow', followSchema);

export default Follow;