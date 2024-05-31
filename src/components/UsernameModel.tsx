"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useUpdateUser from '@/lib/updateUser';

interface PropsType {
    imageUrl: string,
    id: string
}

const UsernameModel: React.FC<PropsType> = ({ imageUrl, id }) => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>();
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

        if (username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }
        if(!image){
            const response = await axios.post("/api/user/update/username" , JSON.stringify({id , username , imageUrl}))
            if (response.data.status) {
                await updateUser();
                toast.success("User updated successfully");
            } else {
                toast.error(response.data.message);
            }
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("id", id);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post("/api/user/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                await updateUser();
                toast.success("User updated successfully");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("An error occurred while updating the user");
        }
    }

    return (
        <div className='flex items-center justify-center h-screen w-screen fixed z-50'>
            <div className='flex flex-col items-center'>
                <form className='flex flex-col gap-6 w-[90%] md:w-auto bg-black p-10 rounded-lg' onSubmit={handleSubmit}>
                    <label htmlFor="image" className='flex flex-col items-center cursor-pointer gap-5 w-full'>
                        <p className='font-semibold text-lg text-white w-full'>Upload a Photo</p>
                        <div className='w-[200px]'>
                            <Image src={previewImage || imageUrl} alt='' height={5000} width={5000} className='w-full' />
                        </div>
                    </label>
                    <input className='hidden' type="file" id='image' name='image' onChange={handleFileInputChange} />
                    <label className='text-white text-lg font-semibold' htmlFor="username">Username</label>
                    <input className='bg-[#1F1B25] p-3 rounded-lg text-white focus:outline-none' name="username" id="username" placeholder='Enter username' onChange={(e) => { setUsername(e.target.value) }} required />
                    <button className='text-white w-full bg-[#7C55E7] p-2 rounded-lg text-lg font-semibold' type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UsernameModel;
