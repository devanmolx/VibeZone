"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useUpdateUser from '@/lib/updateUser';
import { LoadingContext } from '@/context/LoadingContext/LoadingContext';
import Loading from '@/app/(dashboard)/loading';

interface PropsType {
    imageUrl: string,
    id: string
}

const UsernameModel: React.FC<PropsType> = ({ imageUrl, id }) => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>();
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const updateUser = useUpdateUser();

    function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = () => {
                const result = fileReader.result;
                if (typeof result === 'string') {
                    setPreviewImage(result);
                } else {
                    console.error('Failed to read file as data URL');
                }
            }
            fileReader.onerror = () => {
                console.error('File reading error occurred');
            }
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);
        if (username.length < 3) {
            toast.error("Username must be at least 3 characters");
            setIsLoading(false);
            return;
        }
        if (!image) {
            const response = await axios.post("/api/user/update/username", JSON.stringify({ id, username, imageUrl }))
            if (response.data.status) {
                await updateUser();
                toast.success("User updated successfully");
                window.location.reload();

            } else {
                toast.error(response.data.message);
            }
            setIsLoading(false)
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("id", id);
        if (image) {
            formData.append("image", image);
        }

        try {
            setIsLoading(true)
            const response = await axios.post("/api/user/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                await updateUser();
                toast.success("User updated successfully");
                window.location.reload();

            } else {
                toast.error(response.data.message);
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("An error occurred while updating the user");
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex items-center justify-center h-screen w-screen fixed z-50 backdrop-blur-md bg-black/50'>
            <div className='flex flex-col items-center'>
                <form className='flex flex-col gap-6 w-[90%] md:w-auto bg-[#0E0B13] border border-white/10 shadow-2xl p-8 md:p-10 rounded-3xl' onSubmit={handleSubmit}>
                    <div className='text-center'><h2 className='text-2xl font-bold text-white'>Set up your profile</h2><p className='text-sm text-gray-400'>Pick a photo and a username</p></div>
                    <label htmlFor="image" className='flex flex-col items-center cursor-pointer gap-5 w-full'>
                        <p className='font-semibold text-sm text-[#B9A5FF] w-full text-center'>Click to change photo</p>
                        <div className='w-[160px] h-[160px] mx-auto rounded-full ring-4 ring-[#7C55E7]/60 flex items-center justify-center overflow-hidden'>
                            <Image src={previewImage || imageUrl} alt='' height={5000} width={5000} className='w-full' />
                        </div>
                    </label>
                    <input className='hidden' type="file" id='image' name='image' onChange={handleFileInputChange} />
                    <label className='text-white text-lg font-semibold' htmlFor="username">Username</label>
                    <input className='bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-[#7C55E7]' name="username" id="username" placeholder='Enter username' onChange={(e) => { setUsername(e.target.value) }} required />
                    <button className='text-white w-full bg-gradient-to-r from-[#7C55E7] to-[#E2367C] p-3 rounded-xl text-lg font-semibold transition hover:opacity-90' type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UsernameModel;
