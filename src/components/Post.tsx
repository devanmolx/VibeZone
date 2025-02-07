"use client"
import React, { useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { UserContext } from '@/context/UserContext/UserContext';

interface PostProps {
    post: {
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
}

const Post: React.FC<PostProps> = ({ post }) => {

    const { user } = useContext(UserContext)
    const token = user._id
    const pathname = usePathname()
    const [expanded, setExpanded] = useState(false)
    const [isLiked, setIsLiked] = useState(token && post.likes.includes(token))

    async function handleLike() {
        const response = await axios.post("/api/post/like", { from: token, to: post._id })
        if (response.data.status) {
            setIsLiked(!isLiked)
        }
        else {
        }
    }

    return (
        <>
            <div className="bg-black flex flex-col items-center gap-4 p-4 md:p-8 rounded-lg mt-4 w-[90%] md:w-[600px] xl:w-[800px]">
                <div className="flex gap-4 w-full">
                    <div className="w-[50px] h-[50px] bg-white rounded-full overflow-hidden">
                        {pathname.split("/")[1] !== "profile" ?
                            <Link href={`/profile/${post.creator._id}`}>
                                <Image src={post.creator.imageUrl} alt="" height={500} width={500} className=' w-full' />
                            </Link> :
                            <Image src={post.creator.imageUrl} alt="" height={500} width={500} className=' w-full' />
                        }
                    </div>
                    <div>
                        <p className="text-white font-bold">{post.creator.name}</p>
                        <p className="text-white text-sm">@{post.creator.username}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <p className="text-white text-justify md:text-xl">{
                        expanded ? `${post.caption}` : `${post.caption.slice(0, 200)}`
                    } {post.caption.length > 200 && !expanded && (
                        <button onClick={() => { setExpanded(!expanded) }} className=' text-[#7C55E7] underline'>Read More</button>
                    )}
                        {post.caption.length > 200 && expanded && (
                            <button onClick={() => { setExpanded(!expanded) }} className=' text-[#7C55E7] underline'>Read Less</button>
                        )}</p>

                    <Image src={post.postImageUrl} alt="" width={5000} height={5000} className="w-full rounded-lg" />
                </div>
                <div className=' text-white w-full'>
                    <button className=' text-2xl font-bold' onClick={handleLike}>
                        {isLiked ? <FaHeart className=' text-red-600' /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Post;
