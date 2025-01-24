import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    caption:{
        type:String,
        required:true
    },
    postImageUrl:{
        type:String,
        required:true
    },
    likes:{
        type:[{type:mongoose.Schema.Types.ObjectId , required:true , ref:'user'}],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.models.post || mongoose.model("post" , postSchema);

export default Post