import User from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, imageUrl } = body;
    
    try {
        await dbConnect();
        
        const user = await User.findOne({ email })
        if (user) {
            return Response.json({ user: user, token: user._id, status: true })
        }
        else {

            const user = await User.create({ name, email, imageUrl })
            if (user) {
                return Response.json({ user: user, token: user._id, status: true })
            }
            else {
                return Response.json({ error: "Internal server error", status: false })
            }
        }

    } catch (error) {
        return Response.json({ message: "Internal server error", status: false })
    }
}