import React from 'react'
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
    creator: {
        _id: string,
        name: string,
        email: string,
        imageUrl: string,
        username: string
    };
    likes: any[];
    postImageUrl: string;
    username: string;
    __v: number;
    _id: string;
}

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id

    let user: UserType = { _id: '', name: '', username: '', email: '', password: '', imageUrl: '', posts: [], savedPosts: [], likedPosts: [], followers: [], following: [], createdAt: new Date(), __v: 0 };
    let posts: PostType[] = []

    const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/me`, { token: id });
    const postsResponse = await axios.post(`${process.env.WEBSITE_URL}/api/post/user`, { token: id })
    if (response.data.status) {
        user = response.data.message
        posts = Array.isArray(postsResponse.data.message) ? postsResponse.data.message : [postsResponse.data.message]
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