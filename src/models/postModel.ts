import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
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
        type:[{type:mongoose.Schema.Types.ObjectId , required:true , ref:'users'}],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.models.posts || mongoose.model("posts" , postSchema);

export default Post