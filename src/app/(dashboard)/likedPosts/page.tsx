"use client"
import Post from '@/components/Post';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../../context/UserContext';

interface PostType {
    caption: string;
    createdAt: string;
    creator: {
        _id:string,
        name: string,
        email: string,
        imageUrl: string,
        username:string
    };
    likes: any[];
    postImageUrl: string;
    username: string;
    __v: number;
    _id: string;
}

const Page = () => {
    const {user} = useContext(UserContext)
    const [posts, setPosts] = useState<PostType[]>();

    useEffect(() => {
        if (user._id) {
            fetchPosts()
        }
    }, [user])

    async function fetchPosts() {
        if(user){
            const response = await axios.post("/api/post/likedPosts", { token: user._id})
            if (response.data.status) {
                setPosts(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
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