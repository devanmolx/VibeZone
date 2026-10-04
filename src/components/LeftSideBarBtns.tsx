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
        router.push("/")
    }

    return (
        <>
            <div className=" border-t border-b border-white/10 w-full flex flex-col">
                <ul className=" flex flex-col p-4 gap-4">
                    <li className={`px-4 py-3 font-semibold text-gray-200 transition hover:bg-white/10 ${pathname == "/feed" ? "!bg-gradient-to-r from-[#7C55E7] to-[#E2367C] !text-white shadow-lg shadow-[#7C55E7]/20" : ""} rounded-xl text-lg`}><Link className="w-full flex items-center gap-4" href={"/feed"}><FaHome /> Home</Link></li>
                    <li className={`px-4 py-3 font-semibold text-gray-200 transition hover:bg-white/10 ${pathname == "/create" ? "!bg-gradient-to-r from-[#7C55E7] to-[#E2367C] !text-white shadow-lg shadow-[#7C55E7]/20" : ""} rounded-xl text-lg`}><Link className="w-full flex items-center gap-4" href={"/create"}><MdOutlinePostAdd /> Create Post</Link></li>
                    <li className={`px-4 py-3 font-semibold text-gray-200 transition hover:bg-white/10 ${pathname == "/people" ? "!bg-gradient-to-r from-[#7C55E7] to-[#E2367C] !text-white shadow-lg shadow-[#7C55E7]/20" : ""} rounded-xl text-lg`}><Link className="w-full flex items-center gap-4" href={"/people"}><MdOutlinePeopleAlt /> People</Link></li>
                    <li className={`px-4 py-3 font-semibold text-gray-200 transition hover:bg-white/10 ${pathname == "/likedPosts" ? "!bg-gradient-to-r from-[#7C55E7] to-[#E2367C] !text-white shadow-lg shadow-[#7C55E7]/20" : ""} rounded-xl text-lg`}><Link className="w-full flex items-center gap-4" href={"/likedPosts"}><FaRegHeart /> Liked Posts</Link></li>
                </ul>
            </div>
            <div className="w-full flex flex-col">
                <ul className=" flex flex-col gap-4">
                    <li className={`px-4 py-3 font-semibold text-gray-200 transition hover:bg-white/10 ${""} rounded-xl text-lg`}><button className="w-full flex items-center gap-4" onClick={handleLogout} ><FiLogOut /> Logout</button></li>
                </ul>
            </div>
        </>
    )
}

export default LeftSideBarBtns