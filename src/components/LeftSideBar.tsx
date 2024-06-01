import { authOptions } from '@/lib/authOptions'
import axios from 'axios';
import { getServerSession } from 'next-auth'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from "next/image"
import logo from "@/asset/logo.png"
import React from 'react'
import LefSideBarComponent from "@/components/LefSideBarComponent"
import UsernameModel from '@/components/UsernameModel';

interface UserType {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    posts: string[];
    savedPosts: string[];
    likedPosts: string[];
    followers: string[];
    following: string[];
    __v: number;
}

const Page = async () => {

    const session = await getServerSession(authOptions);
    let user: UserType = { _id: '', name: '', username: '', email: '', password: '', imageUrl: '', posts: [], savedPosts: [], likedPosts: [], followers: [], following: [], __v: 0 };
    if (!session) {
        redirect("/api/auth/signin")
    }
    else {
        if (session.user && session.user.id) {
            const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/me`, { token: session.user.id })
            if (response.data.status) {
                user = response.data.message
            }
            else {
                redirect("/api/auth/signin")
            }
        }
    }

    return (
        <>
            {!user.username && <UsernameModel imageUrl={user.imageUrl} id={user._id} />}
            <div className=" hidden h-screen flex-shrink-0 w-[300px] lg:block">
                <div className=' fixed w-[300px] flex flex-col items-center gap-4 p-4'>
                    <div className=" flex flex-col items-center gap-4 pt-4 w-full">
                        <Link href={"/"} >
                            <Image src={logo} alt="" priority/>
                        </Link>
                        <div className=" w-[80px] h-[80px] relative overflow-hidden object-contain rounded-full bg-black mt-2 flex justify-center">
                            <Link href={"/profile/me"}>
                                <Image src={user?.imageUrl} alt="" fill={true} className=' w-full' />
                            </Link>
                        </div>
                        <p className=" text-white text-xl font-semibold">{user?.name}</p>
                    </div>
                    <LefSideBarComponent Initialuser={user} />
                </div>
            </div>
        </>
    )
}

export default Page