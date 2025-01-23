import axios from 'axios';
import React from 'react'
import People from '@/components/People';
import { cookies } from 'next/headers'

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

const Page = async () => {
    let people: UserType[] = [] 
    
    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value;

    if(token){
        const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/all`, { token })
        if (response.status) {
            people = response.data.message;
        }
        else {
            
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar'>
            <div className=' flex flex-col'>
                {token && people?.map(user => (
                    <People user={user} key={user._id} token={token} />
                ))}
            </div>
        </div>
    )
}

export default Page