"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from "@/components/Post"
import Loading from "@/components/Loading";

interface Post {
  caption: string;
  createdAt: string;
  creator: string;
  likes: any[];
  name: string;
  postImageUrl: string;
  profilePhoto: string;
  username: string;
  __v: number;
  _id: string;
}

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>()
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return
    }
    else {
      fetchPosts()
    }
  }, [router]);

  async function fetchPosts() {
    const response = await axios.post("/api/post/all", JSON.stringify({ token: localStorage.getItem("token") }))
    if (response.data.status) {
      setPosts(response.data.message)
      setIsloading(false)
    }
    else {
      toast.error(response.data.message)
    }
  }

  if (isloading) {
    return (
      <Loading />
    )
  }
  return (
    <div className=" h-full w-full flex flex-col items-center gap-10 md:p-8 no-scrollbar">
      <div className="flex flex-col ">
        <h1 className=" text-white text-3xl font-bold">Feed</h1>
      </div>
      <div className=" flex flex-col items-center">
        {posts?.map(post => (
          <Post post={post} key={post._id} />
        ))}

      </div>
      <ToastContainer />
    </div>
  );
}
