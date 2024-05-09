import User from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";
dbConnect();

export async function POST(req:Request) {
    const body = await req.json();
    const {token} = body;
    const user = await User.findById(token);
    if(user){
        return Response.json({message:user , status:true})
    }
    else{
        return Response.json({message:"User not exist" , status:false})
    }

}