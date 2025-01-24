import axios from "axios";
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

  if (token) {

    const response = await axios.post(`${process.env.WEBSITE_URL}/api/post/all`, JSON.stringify({ token }))
    if (response.data.status) {
      posts = Array.isArray(response.data.message) ? response.data.message : [response.data.message];
    }
    else {
      toast.error(response.data.message)
    }
  }
  else {
    redirect("/login")
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
