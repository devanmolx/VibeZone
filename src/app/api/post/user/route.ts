import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
dbConnect()

export async function POST(req:Request) {
    const body = await req.json();
    const {token} = body;
    
    const posts = await Post.find({
        creator : token
    })
    if(posts){
        return Response.json({message:posts , staus:true})
    }
    else{
        return Response.json({message:"No posts" , staus:false})
    }

}