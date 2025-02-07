import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'post'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.models.comment || mongoose.model('comment', commentSchema);

export default Comment