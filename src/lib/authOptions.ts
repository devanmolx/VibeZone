import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userModel";
import dbConnect from "./dbConnect";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async signIn({ user }:any) {
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                user.id = existingUser._id;
            } else {
                const newUser = await User.create({ name: user.name, email: user.email , imageUrl:user.image });
                user.id = newUser._id;
            }

            return true;
        },
        async jwt({ token, user }:any) {
            if (user) {
                token.uid = user.id;
                token.name = user.name,
                token.email = user.email,
                token.image = user.image

            }
            return token;
        },
        async session({ session, token }:any) {
            if (token) {
                session.user.id = token.uid,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.image
            }
            return session;
        },
    },
}
