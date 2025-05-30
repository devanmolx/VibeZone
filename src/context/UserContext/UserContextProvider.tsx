"use client"
import { useState, ReactNode } from "react";
import { UserContext } from "./UserContext";

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
    __v: number;
}

interface Props {
    children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserType>({
        _id: '',
        name: '',
        username: '',
        email: '',
        password: '',
        imageUrl: '',
        posts: [],
        savedPosts: [],
        likedPosts: [],
        followers: [],
        following: [],
        __v: 0
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// UserProvider.displayName = "UserProvider";

export default UserContextProvider;
