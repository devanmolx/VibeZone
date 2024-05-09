import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
dbConnect()

export async function POST(req:Request) {
    const body = await req.json();
    const {token} = body;

    const peoples = await User.find({ _id :{$ne: token}});
    if(peoples){
        return Response.json({message:peoples , status:true})
    }
    else{
        return Response.json({message :"No people found" , status:false})
    }
}