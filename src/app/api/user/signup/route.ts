import User from "@/models/userModel";
import { z } from "zod"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import app from "@/lib/Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

dbConnect();

const salt = bcrypt.genSaltSync(10)

const SignupSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export async function POST(req: Request) {
    const body = await req.formData();

    
    const image =  body.get("image") as File
    const name =  body.get("name")
    const username =  body.get("username")
    const email =  body.get("email")
    const password =  body.get("password") as string

    try {
        const validatedData = SignupSchema.parse({ name, username, email, password });
    
    } catch (error) {
        console.error('Validation error:', error);
        return Response.json({ message: 'Validation failed', status: false });
    }
    
    let user = await User.findOne({ username });
    if (user) {
        return Response.json({ message: "Username already taken", status: false })
    }
    
    user = await User.findOne({ email })
    if (user) {
        return Response.json({ message: "User already exist", status: false })
    }
    
    const storage = getStorage(app);
    const storageRef = ref(storage, `profileImages/${username}`);

    try {
        await uploadBytes(storageRef, image)

        const imageUrl = await getDownloadURL(ref(storage, `profileImages/${username}`))

        const hashedPassword = bcrypt.hashSync(password, salt);

        user = await User.create({ name, username, email, password: hashedPassword, imageUrl })
        if (user) {
            return Response.json({ message:user._id, status: true })
        }

    } catch (error) {
        return Response.json({ message: "Internal server error", status: false })
    }
}
