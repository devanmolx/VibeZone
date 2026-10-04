import LeftSideBarBtns from './LeftSideBarBtns';

interface PropType {
    user: {
        _id: string;
        name: string;
        username: string;
        email: string;
        password: string;
        imageUrl: string;
        posts: string[];
        savedPosts: string[];
        likedPosts: string[];
        followers: string[];
        following: string[];
        __v: number;
    }
}

const LefSideBarComponent: React.FC<PropType> = ({ user }) => {

    return (
        <>
            <div className=" flex items-center justify-around w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3">
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.posts.length} </p>
                    <p className=" text-gray-400 text-sm">Posts</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.followers.length}</p>
                    <p className=" text-gray-400 text-sm">Followers</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.following.length}</p>
                    <p className=" text-gray-400 text-sm">Following</p>
                </div>
            </div>
                        <LeftSideBarBtns />
        </>
    )
}

export default LefSideBarComponent