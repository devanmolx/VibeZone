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
            <div className=" flex items-center justify-around w-full">
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.posts.length} </p>
                    <p className=" text-white text-sm font-semibold">Posts</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.followers.length}</p>
                    <p className=" text-white text-sm font-semibold">Followers</p>
                </div>
                <div className=" flex flex-col items-center">
                    <p className=" text-white text-lg font-semibold">{user.following.length}</p>
                    <p className=" text-white text-sm font-semibold">Following</p>
                </div>
            </div>
            <br />
            <LeftSideBarBtns />
        </>
    )
}

export default LefSideBarComponent