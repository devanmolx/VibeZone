import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from "next/image"
import logo from "@/asset/logo.png"
import React from 'react'
import LefSideBarComponent from "@/components/LefSideBarComponent"
import UsernameModel from '@/components/UsernameModel';
import { cookies } from 'next/headers'
import UpdateUserDetails from './UpdateUserDetails';
import { UserType } from '@/context/UserContext/UserContext';

const Page = async () => {


    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value;

    let user: UserType = { _id: '', name: '', username: '', email: '', password: '', imageUrl: '', posts: [], savedPosts: [], likedPosts: [], followers: [], following: [], __v: 0 };
    if (!token) {
        redirect("/")
    }
    else {
        const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/me`, { token })
        if (response.data.status) {
            user = response.data.message
        }
        else {
            redirect("/signin")
        }
    }

    return (
        <>
            <UpdateUserDetails user={user} />
            {!user.username && <UsernameModel imageUrl={user.imageUrl} id={user._id} />}
            <div className=" hidden h-screen flex-shrink-0 w-[300px] lg:block">
                <div className=' fixed w-[300px] h-screen overflow-y-auto no-scrollbar flex flex-col items-center gap-4 p-4 border-r border-white/10 bg-[#0E0B13]/60 backdrop-blur'>
                    <div className=" flex flex-col items-center gap-4 pt-4 w-full">
                        <Link href={"/feed"} >
                            <Image src={logo} alt="" priority />
                        </Link>
                        <div className=" w-[88px] h-[88px] relative overflow-hidden object-contain rounded-full bg-black mt-2 flex justify-center ring-4 ring-[#7C55E7]/60 transition hover:ring-[#E2367C]/70">
                            <Link href={"/profile/me"}>
                                <Image src={user?.imageUrl} alt="" fill={true} className=' w-full' />
                            </Link>
                        </div>
                        <div className="text-center">
                            <p className=" text-white text-xl font-semibold">{user?.name}</p>
                            {user?.username && <p className="text-sm text-gray-400">@{user.username}</p>}
                        </div>
                    </div>
                    <LefSideBarComponent user={user} />
                </div>
            </div>
        </>
    )
}

export default Page