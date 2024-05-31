import axios from 'axios';
import React from 'react'
import People from '@/components/People';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

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
    let people : UserType[] = [] 
    const session = await getServerSession(authOptions);

    if(session && session.user && session.user.id){
        const response = await axios.post(`${process.env.WEBSITE_URL}/api/user/all`, { token: session.user.id })
        if (response.status) {
            people = response.data.message;
        }
        else {
            
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar'>
            <div className=' flex flex-col'>
                {people?.map(user => (
                    <People user={user} key={user._id} token={session.user.id} />
                ))}
            </div>
        </div>
    )
}

export default Page