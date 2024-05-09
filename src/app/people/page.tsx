"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import People from '@/components/People';

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

const Page = () => {

    const [people, setPeople] = useState<UserType[]>();

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const response = await axios.post("/api/user/all", { token: localStorage.getItem("token") })
        if (response.status) {
            setPeople(response.data.message);
        }
        else {

        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar'>
            <div className=' flex flex-col'>
                {people?.map(user => (
                    <People user={user} key={user._id} />
                ))}
            </div>
        </div>
    )
}

export default Page