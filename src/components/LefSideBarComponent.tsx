"use client"
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link"
import React, { useContext, useEffect, useState } from 'react'

import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { UserContext } from '@/context/UserContext';
import { useCookies } from 'react-cookie';

interface PropType {
    Initialuser: {
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
}

const LefSideBarComponent: React.FC<PropType> = ({ Initialuser }) => {

    const { user , setUser } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter();

    const displayUser = isloading ? Initialuser : user

    useEffect(() => {
        setUser(Initialuser);
        setIsLoading(false)
    }, [Initialuser, setUser]);

    const pathname = usePathname();

    function handleLogout() {
        removeCookie("token")
        router.push("/signin")
    }

    return (
        <>
            <div className=" flex items-center justify-around w-full">
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{displayUser.posts.length} </p>
                    <p className=" text-white text-sm font-semibold">Posts</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{displayUser.followers.length}</p>
                    <p className=" text-white text-sm font-semibold">Followers</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{displayUser.following.length}</p>
                    <p className=" text-white text-sm font-semibold">Following</p>
                </div>
            </div>
            <br />
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
                    <li className={`px-4 py-3 font-semibold text-white ${pathname == "/creaate" ? "bg-[#7157F0]" : ""} rounded-lg text-xl`}><button className="w-full flex items-center gap-4" onClick={handleLogout} ><FiLogOut /> Logout</button></li>
                </ul>
            </div>
        </>
    )
}

export default LefSideBarComponent