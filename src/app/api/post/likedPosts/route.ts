import Post from "@/models/postModel";
import User from "@/models/userModel";


export async function POST(req:Request) {
    const body = await req.json();
    const {token} = body;
    
    const user = await User.findById(token)
    if(!user){
        return Response.json({message:"No user exist" , status:false})
    }
    const message = []
    for (let i = 0; i < user.likedPosts.length; i++) {
        const post = await Post.findById(user.likedPosts[i]);
        message[i] = post
    }

    return Response.json({message , status:true})

}