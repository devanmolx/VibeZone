import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
    },
    posts:{
        type: [{type:mongoose.Schema.Types.ObjectId , ref:"Post"}],
        default:[],
    },
    savedPosts:{
        type: [{type:mongoose.Schema.Types.ObjectId , ref:"Post"}],
        default:[],
    },
    likedPosts:{
        type: [{type:mongoose.Schema.Types.ObjectId , ref:"Post"}],
        default:[],
    },
    followers:{
        type: [{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
        default:[],
    },
    following:{
        type: [{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
        default:[],
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User