import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from "@/components/Post"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

interface Post {
  caption: string;
  createdAt: string;
  creator: {
    _id: string,
    name: string,
    email: string,
    imageUrl: string,
    username: string
  };
  likes: any[];
  postImageUrl: string;
  username: string;
  __v: number;
  _id: string;
}

export default async function Home() {

  let posts: Post[] = []

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/")
  }

  try {

    const response = await axios.post(`${process.env.WEBSITE_URL}/api/post/all`, JSON.stringify({ token }))
    if (response.data.status) {
      console.log(response.data.message);
      console.log(Array.isArray(response.data.message))
      posts = Array.isArray(response.data.message) ? response.data.message : [response.data.message];
    }
    else {
      toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <div className=" h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar">
      <div className="flex flex-col items-center gap-1">
        <h1 className=" text-white text-3xl font-bold">Your <span className="bg-gradient-to-r from-[#7C55E7] to-[#E2367C] bg-clip-text text-transparent">Feed</span></h1>
        <p className="text-gray-400 text-sm">See what everyone is vibing to</p>
      </div>
      <div className=" flex flex-col items-center">
        {posts && posts.map(post => (
          <Post post={post} key={post._id} />
        ))}
        {posts.length === 0 && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-xl font-semibold text-white">Nothing here yet</p>
            <p className="text-gray-400">Be the first to share a vibe.</p>
            <Link href="/create" className="rounded-xl bg-gradient-to-r from-[#7C55E7] to-[#E2367C] px-6 py-3 font-semibold text-white transition hover:scale-105">Create a post</Link>
          </div>
        )}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}
