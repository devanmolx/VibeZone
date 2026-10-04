import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { uploadImage } from "@/lib/cloudinary";
dbConnect();


export async function POST(req:Request) {
    const body = await req.formData();

    const creator = body.get("creator")
    const caption = body.get("caption")
    const postImage = body.get("postImage") as File


    const user = await User.findById(creator);
    if(!user){
        return Response.json({message:"No user exist" , status:false})
    }

    let postImageUrl: string;
    try {
        postImageUrl = await uploadImage(postImage, "vibezone/posts");
    } catch (error) {
        console.error("Image upload error:", error);
        return Response.json({message:"Image upload failed" , status:false})
    }

    const post = await Post.create({creator ,name:user.name,  caption , postImageUrl, profilePhoto:user.imageUrl , username :user.username})

    await User.findByIdAndUpdate(creator , {$push:{posts : post._id}})

    if(post){
        return Response.json({message : post._id , status:true})
    }
    else{
        return Response.json({message:"Internal Server Error" , status:false})
    }
}