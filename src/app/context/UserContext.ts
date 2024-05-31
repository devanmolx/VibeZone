import {createContext , useContext} from "react"

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

type UserContextType = {
    user: UserType;
    setUser: (user: UserType) => void;
};

const UserContextDefaultValues: UserContextType = {
    user: {_id: '',name: '',username: '',email: '',password: '',imageUrl: '',posts: [],savedPosts: [],likedPosts: [],followers: [],following: [],__v: 0},
    setUser : () => {}
};

export const UserContext = createContext<UserContextType>(UserContextDefaultValues);
