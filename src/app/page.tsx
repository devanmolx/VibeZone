import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import Post from "@/components/Post"
import { authOptions } from "@/lib/authOptions";

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

export default async function Home() {
  
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/api/auth/signin")
  }

  let posts : Post[] = []

  const response = await axios.post(`${process.env.WEBSITE_URL}/api/post/all`, JSON.stringify({ token: session.user.id }))
  if (response.data.status) {
    posts = Array.isArray(response.data.message) ? response.data.message : [response.data.message];
  }
  else {
    toast.error(response.data.message)
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
