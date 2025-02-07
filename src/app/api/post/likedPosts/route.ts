import Post from "@/models/postModel";
import User from "@/models/userModel";


export async function POST(req: Request) {
    const body = await req.json();
    const { token } = body;

    const user = await User.findById(token)
        .populate({
            path: "likedPosts",
            populate: {
                path: "creator",
            }
        })
    console.log(user.likedPosts);
    if (!user) {
        return Response.json({ message: "No user exist", status: false })
    }

    return Response.json({ message: user.likedPosts, status: true })

}