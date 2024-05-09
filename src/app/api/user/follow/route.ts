import User from "@/models/userModel";

export async function POST(req:Request) {
    const body = await req.json();
    const {from , to} = body;
    
    const fromAccount = await User.findById(from)
    const toAccount = await User.findById(to)
    if(!fromAccount && !toAccount){
        return Response.json({message: "Invalid user" , status:false})
    }

    if(toAccount.followers.includes(from)){
        await User.findByIdAndUpdate(to , {$pull :{followers : from}})
        await User.findByIdAndUpdate(from , {$pull :{following : to}})
        return Response.json({message :"Unfollowed successfully" , status:true})
    }
    else{
        await User.findByIdAndUpdate(to , {$push :{followers : from}})
        await User.findByIdAndUpdate(from , {$push :{following : to}})
        return Response.json({message :"Followed successfully" , status:true})
    }
}