import dbConnect from "@/lib/dbConnect";
import Post from "@/models/postModel";
dbConnect();

export async function POST(req: Request) {
    const body = await req.json();
    const { token } = body;

    console.log(token);

    const post = await Post.find({
        creator: { $ne: token },
    })
        .populate("creator")
        // .populate("comments")
    if (post) {
        console.log(post)
        return Response.json({ message: post, status: true })
    }
    else {
        return Response.json({ message: "No Post Available", staus: false })
    }
}