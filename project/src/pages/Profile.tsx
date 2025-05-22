import React, { useState } from 'react';
import { Grid, Bookmark, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { posts } = usePosts();
  const [activeTab, setActiveTab] = useState('posts');
  
  const userPosts = posts.filter(post => post.user.id === user?.id);
  const savedPosts = posts.filter(post => post.isSaved);

  if (!user) return null;

  return (
    <div className="pb-16 md:pb-0">
      {/* Profile Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-start">
          <div className="mr-8">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <h1 className="text-xl font-semibold mr-4">{user.username}</h1>
              <button className="bg-gray-100 px-4 py-1.5 rounded-md text-sm font-medium">
                Edit Profile
              </button>
              <button className="ml-2">
                <Settings className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex space-x-6 mb-4">
              <div>
                <span className="font-semibold">{user.posts}</span> posts
              </div>
              <div>
                <span className="font-semibold">{user.followers.toLocaleString()}</span> followers
              </div>
              <div>
                <span className="font-semibold">{user.following.toLocaleString()}</span> following
              </div>
            </div>
            
            <div>
              <h2 className="font-semibold">{user.fullName}</h2>
              <p className="text-sm whitespace-pre-line">{user.bio}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Profile Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 flex items-center justify-center py-3 ${
              activeTab === 'posts'
                ? 'border-t border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <Grid className="w-4 h-4 mr-1" />
            <span className="text-xs uppercase font-semibold">Posts</span>
          </button>
          
          <button
            className={`flex-1 flex items-center justify-center py-3 ${
              activeTab === 'saved'
                ? 'border-t border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark className="w-4 h-4 mr-1" />
            <span className="text-xs uppercase font-semibold">Saved</span>
          </button>
        </div>
      </div>
      
      {/* Grid of Posts */}
      <div className="grid grid-cols-3 gap-1">
        {(activeTab === 'posts' ? userPosts : savedPosts).map((post) => (
          <div key={post.id} className="relative pb-[100%]">
            <img
              src={post.imageUrl}
              alt="Post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;