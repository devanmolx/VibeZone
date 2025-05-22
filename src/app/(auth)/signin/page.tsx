'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import logo from "@/asset/logo.png"
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import app from '@/lib/Firebase';
import { LoadingContext } from '@/context/LoadingContext/LoadingContext';
import Cookies from 'js-cookie';
import Loading from '@/app/(dashboard)/loading';
import { UserContext } from '@/context/UserContext/UserContext';

const auth = getAuth(app);

const Page = () => {

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const router = useRouter();
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { setUser } = useContext(UserContext)

    async function signInGoogle() {
        const response = await signInWithPopup(auth, googleProvider)
        setIsLoading(true)

        const res = await axios.post("https://anmolgarg.tech/api/user/signin", JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            imageUrl: response.user.photoURL
        }))

        if (res.data.status) {
            window.location.href = "/";
            setUser(res.data.user);
            Cookies.set("token", res.data.token)
        }
        else {
            toast.error(res.data.error)
        }
    }

    async function signInGithub() {
        const response = await signInWithPopup(auth, githubProvider)
        setIsLoading(true);

        const res = await axios.post("/api/user/signin", JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            imageUrl: response.user.photoURL
        }))

        if (res.data.status) {
            window.location.href = "/";
            setUser(res.data.user);
            Cookies.set("token", res.data.token)
        }
        else {
            toast.error(res.data.error)
        }
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="h-screen w-screen bg-[#18141F]">
            <div
                className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
                <div className="relative container m-auto px-6">
                    <div className="m-auto md:w-7/12">
                        <div className="rounded-xl bg-[#18141F] shadow-xl">
                            <div className="p-8">
                                <div className="space-y-4">
                                    <Image src={logo} height={1000} width={1000} alt=''
                                        className=" w-[500px]" loading='lazy'
                                    ></Image>
                                    <h2 className=" text-center mb-8 text-2xl text-cyan-900 dark:text-white font-bold">Log in to unlock VibeZone
                                    </h2>
                                </div>
                                <div className="mt-10 grid space-y-4">
                                    <button
                                        onClick={signInGoogle}
                                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <Image src={'https://www.svgrepo.com/show/475656/google-color.svg'} alt='' height={100} width={100} className="absolute left-0 w-5" loading='lazy'
                                            ></Image>
                                            <span
                                                className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
                                                with Google
                                            </span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={signInGithub}
                                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                                                </path>
                                            </svg>
                                            <span
                                                className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition dark:text-white duration-300 group-hover:text-blue-600 sm:text-base">Continue
                                                with Github
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                                    <p className="text-xs">By proceeding, you agree to our
                                        <a href="/" className="underline">Terms of Use</a>
                                        and confirm you have read our
                                        <a href="/" className="underline">Privacy and Cookie Statement</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page