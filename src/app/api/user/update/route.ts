import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.formData();

    const image = body.get("image") as File;
    const username = body.get("username") as string;
    const id = body.get("id") as string;

    const user = await User.findById(id);

    if (user) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "Username already exists", status: false }));
        }
        else {
            const imageUrl = await uploadImage(image, "vibezone/profiles", username);

            const updatedUser = await User.findByIdAndUpdate(id, { username, imageUrl });

            if (updatedUser) {
                return new Response(JSON.stringify({ message: updatedUser._id, status: true }));
            } else {
                return new Response(JSON.stringify({ message: "Failed to update user", status: false }));
            }
        }
    } else {
        return new Response(JSON.stringify({ message: "No user exists", status: false }));
    }
}
