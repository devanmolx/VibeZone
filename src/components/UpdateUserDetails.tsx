'use client'
import { UserContext } from '@/context/UserContext/UserContext'
import React, { useContext, useEffect } from 'react'

interface PropType {
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
        __v: number;
    }
}

const UpdateUserDetails: React.FC<PropType> = ({ user }) => {

    const { setUser } = useContext(UserContext)

    useEffect(() => {
        setUser(user);
    }, [user, setUser])

    return (
        null
    )
}

export default UpdateUserDetails