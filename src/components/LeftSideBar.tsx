"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link"
import Image from "next/image"

import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { VscSaveAll } from "react-icons/vsc";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import avatar from "@/asset/avatar.png"
import logo from "@/asset/logo.png"
import axios from 'axios';


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
    createdAt: Date;
    __v: number;
}

const LeftSideBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<UserType>();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
            return
        }
        else {
            fetchUser()
        }
    }, [])

    async function fetchUser() {
        try {
            const response = await axios.post("/api/user/me", { token: localStorage.getItem('token') })
            setUser(response.data.message);
            setIsLoading(false);
        } catch (error) {
            router.push('/signin');
        }
    }

    function handleLogout() {
        localStorage.removeItem("token")
        router.push("/signin")
    }

    if (isLoading) {
        return (
            <div className='h-screen flex-shrink-0 sticky left-0 top-0 w-[300px] flex flex-col items-center gap-4 p-4'></div>
        )
    }

    return (
        <div className=" hidden h-screen flex-shrink-0 w-[300px] lg:block">
            <div className=' fixed w-[300px] flex flex-col items-center gap-4 p-4'>
                <div className=" flex flex-col items-center gap-4 pt-4 w-full">
                    <Link href={"/"} >
                        <Image src={logo} alt="" />
                    </Link>
                    <div className=" w-[80px] h-[80px] relative overflow-hidden object-contain rounded-full bg-black mt-2 flex justify-center">
                        <Link href={"/profile/me"}>
                            <Image src={user?.imageUrl || avatar} alt="" fill={true} />
                        </Link>
                    </div>
                    <p className=" text-white text-xl font-semibold">{user?.name}</p>
                    <div className=" flex items-center justify-around w-full">
                        <div className=" flex flex-col items-center">
                            <p className=" text-white text-lg font-semibold">{user?.posts.length}</p>
                            <p className=" text-white text-sm font-semibold">Posts</p>
                        </div>
                        <div className=" flex flex-col items-center">
                            <p className=" text-white text-lg font-semibold">{user?.followers.length}</p>
                            <p className=" text-white text-sm font-semibold">Followers</p>
                        </div>
                        <div className=" flex flex-col items-center">
                            <p className=" text-white text-lg font-semibold">{user?.following.length}</p>
                            <p className=" text-white text-sm font-semibold">Following</p>
                        </div>
                    </div>
                    <br />
                </div>
                <div className=" border-t-2 border-b-2 border-white w-full flex flex-col">
                    <ul className=" flex flex-col p-4 gap-4">
                        <li className={`px-4 py-3 font-semibold text-white ${pathname == "/" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><Link className="w-full flex items-center gap-4" href={"/"}><FaHome /> Home</Link></li>
                        <li className={`px-4 py-3 font-semibold text-white ${pathname == "/create" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><Link className="w-full flex items-center gap-4" href={"/create"}><MdOutlinePostAdd /> Create Post</Link></li>
                        <li className={`px-4 py-3 font-semibold text-white ${pathname == "/people" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><Link className="w-full flex items-center gap-4" href={"/people"}><MdOutlinePeopleAlt /> People</Link></li>
                        <li className={`px-4 py-3 font-semibold text-white ${pathname == "/likedPosts" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><Link className="w-full flex items-center gap-4" href={"/likedPosts"}><FaRegHeart /> Liked Posts</Link></li>
                    </ul>
                </div>
                <div className="w-full flex flex-col">
                    <ul className=" flex flex-col gap-4">
                        {/* <li className={`px-4 py-3 font-semibold text-white ${pathname == "/manage" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><Link className="w-full flex items-center gap-4" href={"/"}><FaUserCircle /> Manage Account</Link></li> */}
                        <li className={`px-4 py-3 font-semibold text-white ${pathname == "/creaate" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><button className="w-full flex items-center gap-4" onClick={handleLogout} ><FiLogOut /> Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar