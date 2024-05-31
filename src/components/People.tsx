"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import axios from 'axios';

interface UserType {
    user: {
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
    },
    token:string
}

const People: React.FC<UserType> = ({ user , token }) => {

    const [isFollowing, setisFollowing] = useState(token && user && user.followers && user.followers.includes(token))

    async function handleFollow() {
        const response = await axios.post("/api/user/follow", { from: token, to: user._id })
        if (response.data.status) {
            setisFollowing(!isFollowing)
        }
        else {
        }
    }

    return (
        <>
            <div key={user._id} className=' flex items-center justify-between w-[450px] m-2'>
                <div className=' flex items-center gap-8'>
                    <div className=' relative w-[70px] h-[70px] rounded-full overflow-hidden flex items-center border border-white'>
                        <Link href={`/profile/${user._id}`} >
                            <Image src={user?.imageUrl} alt='' height={5000} width={5000} className=' w-full' />
                        </Link>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <p className=" text-white  font-semibold">{user?.name}</p>
                        <p className=" text-gray-300 text-[12px]">{"@" + user?.username}</p>
                    </div>
                </div>
                <button onClick={() => { handleFollow() }} className=' py-2 px-4 rounded-lg bg-[#7C55E7]'>{isFollowing ? "Following" : "Follow"}</button>
            </div >
        </>
    )
}

export default People