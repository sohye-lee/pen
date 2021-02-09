import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
       type: String,
       required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;