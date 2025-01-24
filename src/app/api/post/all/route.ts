import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
dbConnect();

export async function POST(req:Request) {
    const body = await req.json();
    const {token} = body;
    
    const post = await Post.find({
        creator:{ $ne: token},
    })
    .populate("creator")
    if(post){
        return Response.json({message : post , status:true})
    }
    else{
        return Response.json({message: "No Post Available" , staus:false})
    }
}