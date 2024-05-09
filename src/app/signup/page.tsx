"use client"
import axios from "axios";
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/Loading";

export default function Signup() {


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [image, setImage] = useState<File>();
    const [isloading, setIsloading] = useState(false)
    const router = useRouter();

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0])
        }
    };

    async function handleSignup(e: any) {
        e.preventDefault();
        setIsloading(true)

        if (name.length < 2) {
            toast.error("Please enter a valid name")
            return
        }
        else if (password.length < 8) {
            toast.error("Password must be atleast 8 digits")
            return
        }
        else if (password != cpassword) {
            toast.error("Password should be same")
            return
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)

        if (image) {
            formData.append("image", image)
        }

        const response = await axios.post("/api/user/signup", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.data.status) {
            localStorage.setItem("token", response.data.message)
            router.push("/")
        }
        else {
            setIsloading(false);
            toast.error(response.data.message)
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
            <div className="h-screen flex justify-center flex-col bg-slate-600">
                <div className="flex justify-center">
                    <div className="block max-w-sm p-6 bg-slate-700 rounded-lg shadow cursor-pointer ">
                        <div className=" flex flex-col items-center justify-center">
                            <div>
                                <div className="text-3xl font-extrabold text-white">
                                    Sign up
                                </div>
                            </div>
                            <form onSubmit={handleSignup} className="pt-2">
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Name</label>
                                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" onChange={e => { setName(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Username</label>
                                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" onChange={e => { setUsername(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Email</label>
                                <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="abc@gmail.com" onChange={e => { setEmail(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Password</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" onChange={e => { setPassword(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Confirm Password</label>
                                <input type="password" id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" onChange={e => { setCPassword(e.target.value) }} required />
                                <label className="block mb-2 text-sm font-semibold pt-4 text-white">Profile Image</label>
                                <input type="file" accept=".jpeg, .png, .jpg" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFileInputChange} required />
                                <button type="submit" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign up</button>
                            </form>
                            <div className=" w-full flex items-center justify-center">
                                <p className=" text-white font-medium">Already have an account ? <a href="/signin" className=" text-[#7C55E7] font-semibold">Signin</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}