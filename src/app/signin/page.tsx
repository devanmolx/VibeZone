"use client"
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import Image from "next/image"
import logo from "@/asset/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsloading] = useState(false)

    async function handleSignin(e: any) {
        e.preventDefault();
        setIsloading(true)

        if (password.length < 8) {
            toast.error("Password must be atleast 8 digits")
            return
        }

        const response = await axios.post("/api/user/signin", JSON.stringify({ email, password }))
        if (response.data.status) {
            localStorage.setItem("token", response.data.message)
            router.push("/")
        }
        else {
            setIsloading(false)
            toast.error(response.data.message, { theme: "dark" })
        }
    }
    if (isloading) {
        return (
            <div className=" w-screen h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col bg-gray-700">
                <div className="flex items-center justify-center">
                    <div className="block max-w-sm p-6 bg-[#1F1B25] rounded-lg shadow ">
                        <div className=" flex flex-col items-center gap-2">
                            <div className=" flex flex-col gap-5">
                                <div>
                                    <Image src={logo} alt="" />
                                </div>
                                <div className="text-2xl font-semibold text-white text-center">
                                    Sign in
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Email</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="abc@gmail.com" onChange={e => { setEmail(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Password</label>
                                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" onChange={e => { setPassword(e.target.value) }} required />
                                <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSignin}>Sign in</button>
                            </div>
                        </div>
                        <div className=" w-full flex item-c justify-center">
                            <p className=" text-white font-medium">Dont have an account ? <a href="/signup" className=" text-[#7C55E7] font-semibold">Signup</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}