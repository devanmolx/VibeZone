import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/commentModel";
import Post from "@/models/postModel";
import User from "@/models/userModel";

dbConnect();

export async function POST(req: Request) {
    const body = await req.json();
    const { userId , postId , caption } = body;

    const user = await User.findById(userId);
    if (!user) {
        return Response.json({message:"User not found" , status:false} , {status:400})
    }
    
    const post = await Post.findById(postId);
    if (post) {
        return Response.json({message:"Post not found" , status:false} , {status:400})
    }

    const comment = await Comment.create({ user: userId, post: postId, caption });

    if (comment) {
        return Response.json({message:comment.id , status:true})
    }
    else {
        return Response.json({message:"Internal Server error" , status:false})
    }
}