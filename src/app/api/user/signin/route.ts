import User from "@/models/userModel";
import { z } from "zod"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
dbConnect();

const salt = bcrypt.genSaltSync(10)

const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const success = SignupSchema.parse(body);
    } catch (error) {
        return Response.json({ message: "Invalid inputs", status: false })
    }
    const { email, password } = body;

    try {

        const user = await User.findOne({ email })
        if (user) {
            const hashedPassword = bcrypt.hashSync(password, salt);
            const isPasswordSame = bcrypt.compareSync(password, hashedPassword);
            if (isPasswordSame) {
                return Response.json({ message: user._id , status: true })
            }
            else {
                return Response.json({ message: "Password does not match", status: false })
            }
        }
        else{
            return Response.json({message:"No user found"  , status:false})
        }

    } catch (error) {
        return Response.json({ message: "Internal server error", status: false })
    }
}