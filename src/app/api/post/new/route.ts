import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import {z} from "zod";
import app from "@/lib/Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
dbConnect();

const PostSchema = z.object({
    creator: z.string(),
    caption: z.string().min(3)
})

export async function POST(req:Request) {
    const body = await req.formData();

    const creator = body.get("creator")
    const caption = body.get("caption")
    const postImage = body.get("postImage") as File

    // try {
    //     const validatedData = PostSchema.parse({creator , caption })
    // } catch (error) {
    //     console.error('Validation error:', error);
    //     return Response.json({ message: 'Validation failed', status: false });
    // }

    const user = await User.findById(creator);
    if(!user){
        return Response.json({message:"No user exist" , status:false})
    }

    const date = Date.now()

    const storage = getStorage(app);
    const storageRef = ref(storage, `profileImages/${date}`);

    await uploadBytes(storageRef, postImage)

    const postImageUrl = await getDownloadURL(ref(storage, `profileImages/${date}`))

    const post = await Post.create({creator ,name:user.name,  caption , postImageUrl, profilePhoto:user.imageUrl , username :user.username})

    await User.findByIdAndUpdate(creator , {$push:{posts : post._id}})

    if(post){
        return Response.json({message : post._id , status:true})
    }
    else{
        return Response.json({message:"Internal Server Error" , status:false})
    }
}