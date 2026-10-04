import React from 'react'
import Link from "next/link"
import { FaSearch } from "react-icons/fa";
import { FaPlus, FaUser } from "react-icons/fa";

const TopBar = () => {
    return (
        <div className=" w-full md:w-auto flex items-center justify-around md:justify-normal gap-4 md:gap-10 p-2 md:p-4 flex-wrap ">
            <div className='bg-[#0E0B13] border border-white/10 flex items-center rounded-xl focus-within:border-[#7C55E7] transition'>
                <input type="text" placeholder="Search posts" className=" w-[130px] sm:w-auto p-2 py-4 md:p-4 bg-transparent rounded-lg text-white placeholder:text-gray-500 focus:outline-none" />
                <button>
                    <FaSearch className=" text-white mx-4 text-xl" />
                </button>
            </div>
            <div className=' hidden bg-gradient-to-r from-[#7C55E7] to-[#E2367C] md:flex items-center rounded-xl shadow-lg shadow-[#7C55E7]/20 transition hover:scale-105 py-4 px-2 md:p-4'>
                <Link className=' text-white font-semibold' href={"/create"}> +  Create A Post</Link>
            </div>
            <div className=' md:hidden flex items-center gap-4'>
                <Link href="/create" className='rounded-full bg-gradient-to-r from-[#7C55E7] to-[#E2367C] p-3 text-white'><FaPlus /></Link>
                <Link href="/profile/me" className='rounded-full bg-white/10 p-3 text-white'><FaUser /></Link>
            </div>
        </div>
    )
}

export default TopBar