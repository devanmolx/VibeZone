import Post from '@/components/Post';
import axios from 'axios';
import { cookies } from 'next/headers';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

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

const Page = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let posts: PostType[] = [];

    if (token) {
        const response = await axios.post(`${process.env.WEBSITE_URL}/api/post/likedPosts`, { token })
        if (response.data.status) {
            posts = response.data.message;
        }
        else {
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar'>
            <div className=' flex flex-col items-center'>
                {posts?.map(post => (
                    <Post post={post} key={post._id} />
                ))}
            </div>
        </div>
    )
}

export default Page