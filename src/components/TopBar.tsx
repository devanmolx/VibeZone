import React from 'react'
import Link from "next/link"
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const TopBar = () => {
    return (
        <div className=" w-full md:w-auto flex items-center justify-around md:justify-normal gap-4 md:gap-20 p-2 md:p-4 flex-wrap ">
            <div className='bg-[#35303C] flex items-center rounded-lg'>
                <input type="text" placeholder="Serach posts" className=" w-[130px] sm:w-auto p-2 py-4 md:p-4 bg-[#35303C] rounded-lg text-white focus:outline-none" />
                <button>
                    <FaSearch className=" text-white mx-4 text-xl" />
                </button>
            </div>
            <div className=' hidden bg-gradient-to-r from-[#7C55E7] to-[#E2367C] md:flex items-center rounded-lg py-4 px-2 md:p-4'>
                <Link className=' text-white font-semibold' href={"/create"}> +  Create A Post</Link>
            </div>
            <div className=' md:hidden flex items-center gap-4'>
                <FiLogOut className=' text-white text-3xl font-bold' />
                <div className=' w-[50px] h-[50px] bg-white rounded-full'></div>
            </div>
        </div>
    )
}

export default TopBar