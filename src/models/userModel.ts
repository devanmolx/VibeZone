import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    posts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }],
        default: [],
    },
    savedPosts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }],
        default: [],
    },
    likedPosts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }],
        default: [],
    },
    followers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        default: [],
    },
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        default: [],
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User