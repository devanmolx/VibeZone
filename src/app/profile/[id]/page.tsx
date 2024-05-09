"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import axios from 'axios'
import Post from '@/components/Post'
import avatar from "@/asset/avatar.png"

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

interface PostType {
    caption: string;
    createdAt: string;
    creator: string;
    likes: any[];
    name: string;
    postImageUrl: string;
    profilePhoto: string;
    username: string;
    __v: number;
    _id: string;
}

const Page = () => {

    const { id } = useParams()
    const [user, setUser] = useState<UserType>();
    const [posts, setPosts] = useState<PostType[]>();
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        const response = await axios.post(`/api/user/me`, { token: id });
        const postsResponse = await axios.post("/api/post/user", { token: id })
        if (response.data.status) {
            setUser(response.data.message)
            setPosts(postsResponse.data.message)
            setIsLoading(false)
        }
        else {
            router.push("/")
        }
    }
    if (isLoading) {
        return (
            <div className="bg-[#1F1826] w-full h-full flex items-center justify-center">
                <p className=" text-2xl text-white">Loading.....</p>
            </div>
        )
    }

    return (
        <div className=' w-full h-full flex flex-col items-center gap-10 p-8 overflow-y-scroll no-scrollbar'>
            <div className=' flex items-center gap-10 flex-wrap justify-center'>
                <div className=' w-[130px] h-[130px] rounded-full overflow-hidden flex items-center justify-center'>
                    <Image src={user?.imageUrl || avatar} alt='' height={5000} width={5000} className=' w-full' />
                </div>
                <div className=' flex flex-col items-center gap-4'>
                    <div className=' flex flex-col gap-2'>
                        <p className=" text-white text-xl font-semibold">{user?.name}</p>
                        <p className=" text-gray-300">{"@" + user?.username}</p>
                    </div>
                    <div className=" flex items-center justify-around w-full gap-5">
                        <div className=" flex flex-col items-center">
                            <p className=" text-[#7C55E7] text-lg font-semibold">{user?.posts.length}</p>
                            <p className=" text-white text-lg font-medium">Posts</p>
                        </div>
                        <div className=" flex flex-col items-center">
                            <p className=" text-[#7C55E7] text-lg font-semibold">{user?.followers.length}</p>
                            <p className=" text-white text-lg font-medium">Followers</p>
                        </div>
                        <div className=" flex flex-col items-center">
                            <p className=" text-[#7C55E7] text-lg font-semibold">{user?.following.length}</p>
                            <p className=" text-white text-lg font-medium">Following</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center flex-col gap-4'>
                {posts?.map(post => (
                    <Post post={post} key={post._id} />
                ))}
            </div>
        </div>
    )
}

export default Page