'use client'
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '@/lib/Firebase';
import {useCookies} from "react-cookie"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const auth = getAuth(app);

const Page = () => {

    const provider = new GoogleAuthProvider();
    const router = useRouter();
    const [cookie, setCookie] = useCookies();

    async function signIn() {   
        const response = await signInWithPopup(auth, provider)

        const res = await axios.post("/api/user/signin", JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            imageUrl: response.user.photoURL
        }))

        if (res.data.status) {
            setCookie('token', res.data.message, { path: '/' })
            router.push("/")
        }
        else {
            toast.error(res.data.error)
        }

        
    }

    return (
        <div>
            <button onClick={signIn}>Signin </button>
        </div>
    )
}

export default Page