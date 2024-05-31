import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function POST(req:Request) {
    await dbConnect();
    const body = await req.json();

    const {id,  username ,imageUrl} = body;

    const user = await User.findById(id);
    if(user){

        const existingUser = await User.findOne({username})
        if(existingUser){
            return Response.json({message:"Username already exist" , status:false})
        }
        else{

            const updatedUser = await User.findByIdAndUpdate(id , {username , imageUrl})
            if(updatedUser){
                return Response.json({message:"Username updated" , status:true})
            }
            else{
                return Response.json({message:"Internal Server Error" , status:false})
            }

        }

    }
    else{
        return Response.json({message:"No user exist" , status:false})
    }

}