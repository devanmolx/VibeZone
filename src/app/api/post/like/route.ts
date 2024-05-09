import Post from "@/models/postModel";
import User from "@/models/userModel";

export async function POST(req:Request) {
    const body = await req.json();
    const {from ,to} = body;

    const user = await User.findById(from)
    const post = await Post.findById(to)

    if(!user && !post){
        return Response.json({message: "Inavlid data" , status:false})
    }

    if(post.likes.includes(from)){
        await Post.findByIdAndUpdate(to , {$pull :{likes : from}})
        await User.findByIdAndUpdate(from , {$pull :{likedPosts : to}})
        return Response.json({message:"Unliked successfully" , status:true})
    }
    else{
        await Post.findByIdAndUpdate(to , {$push :{likes : from}})
        await User.findByIdAndUpdate(from , {$push :{likedPosts : to}})
        return Response.json({message:"Liked successfully" , status:true})
    }
}