'use client'
import { usePathname, useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import React from 'react'
import Link from 'next/link';
import Cookies from "js-cookie"

const LeftSideBarBtns = () => {

    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        Cookies.remove("token");
        router.push("/signin")
    }

    return (
        <>
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

export default LeftSideBarBtns