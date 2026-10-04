'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import logo from "@/asset/logo.png"
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaHeart, FaUserFriends, FaImage } from 'react-icons/fa';
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
        let response;
        try {
            response = await signInWithPopup(auth, googleProvider)
        } catch (e) {
            toast.error("Sign in was cancelled or failed")
            return
        }
        setIsLoading(true)

        const res = await axios.post("/api/user/signin", JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            imageUrl: response.user.photoURL
        }))

        if (res.data.status) {
            window.location.href = "/feed";
            setUser(res.data.user);
            Cookies.set("token", res.data.token)
        }
        else {
            toast.error(res.data.error)
        }
    }

    async function signInGithub() {
        let response;
        try {
            response = await signInWithPopup(auth, githubProvider)
        } catch (e) {
            toast.error("Sign in was cancelled or failed")
            return
        }
        setIsLoading(true);

        const res = await axios.post("/api/user/signin", JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            imageUrl: response.user.photoURL
        }))

        if (res.data.status) {
            window.location.href = "/feed";
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

    const btn = "group h-12 w-full px-6 border border-white/15 bg-white/[0.03] rounded-full transition duration-300 hover:border-[#7C55E7] hover:bg-white/[0.08] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#7C55E7]/60"
    const label = "block w-max font-semibold tracking-wide text-white text-sm sm:text-base transition group-hover:text-[#B9A5FF]"

    return (
        <div className="min-h-screen w-screen bg-[#18141F] text-white flex">
            {/* brand panel */}
            <div className="relative hidden lg:flex w-1/2 flex-col justify-between overflow-hidden p-14 bg-[radial-gradient(ellipse_at_top_left,rgba(124,85,231,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(226,54,124,0.4),transparent_60%)]">
                <Link href="/"><Image src={logo} alt="VibeZone" priority className="w-[160px] h-auto" /></Link>
                <div>
                    <h1 className="text-5xl font-extrabold leading-tight">Your vibe,<br />your <span className="bg-gradient-to-r from-[#B9A5FF] to-[#FF7AB0] bg-clip-text text-transparent">zone</span>.</h1>
                    <ul className="mt-10 space-y-5 text-gray-200">
                        <li className="flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><FaImage /></span>Share photos and moments</li>
                        <li className="flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><FaUserFriends /></span>Follow people you love</li>
                        <li className="flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><FaHeart /></span>Like and save favourites</li>
                    </ul>
                </div>
                <p className="text-sm text-gray-400">© {new Date().getFullYear()} VibeZone</p>
            </div>

            {/* form panel */}
            <div className="relative flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-[radial-gradient(ellipse_at_top,rgba(124,85,231,0.2),transparent_60%)]">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0E0B13] p-8 sm:p-10 shadow-2xl">
                    <Link href="/" className="lg:hidden block mb-6"><Image src={logo} alt="VibeZone" priority className="w-[150px] h-auto mx-auto" /></Link>
                    <h2 className="text-3xl font-bold text-center">Welcome back</h2>
                    <p className="mt-2 text-center text-gray-400">Log in to unlock VibeZone</p>

                    <div className="mt-10 grid gap-4">
                        <button onClick={signInGoogle} className={btn}>
                            <div className="relative flex items-center justify-center">
                                <Image src={'https://www.svgrepo.com/show/475656/google-color.svg'} alt='' height={100} width={100} className="absolute left-0 w-5" />
                                <span className={label}>Continue with Google</span>
                            </div>
                        </button>
                        <button onClick={signInGithub} className={btn}>
                            <div className="relative flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-0 w-5 text-white" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <span className={label}>Continue with Github</span>
                            </div>
                        </button>
                    </div>

                    <p className="mt-10 text-center text-xs text-gray-500">
                        By proceeding, you agree to our{" "}
                        <a href="/" className="underline hover:text-gray-300">Terms of Use</a>{" "}
                        and confirm you have read our{" "}
                        <a href="/" className="underline hover:text-gray-300">Privacy and Cookie Statement</a>.
                    </p>
                    <Link href="/" className="mt-6 block text-center text-sm text-[#B9A5FF] hover:underline">&larr; Back to home</Link>
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div>
    )
}

export default Page
