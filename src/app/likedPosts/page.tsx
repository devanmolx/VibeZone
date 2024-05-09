"use client"
import Post from '@/components/Post';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const [posts, setPosts] = useState<PostType[]>();

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        const response = await axios.post("/api/post/likedPosts", { token: localStorage.getItem("token") })
        if (response.data.status) {
            setPosts(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar'>
            <div className=' flex flex-col items-center'>
                {posts?.map(post => (
                    <Post post={post} key={post._id} />
                ))}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Page