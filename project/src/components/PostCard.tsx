import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user: currentUser } = useAuth();
  const { likePost, savePost, addComment } = usePosts();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) return;
    
    addComment(post.id, {
      id: Date.now().toString(),
      user: currentUser,
      text: comment,
      timestamp: new Date().toISOString(),
    });
    
    setComment('');
  };

  const handleDoubleClick = () => {
    if (!post.isLiked) {
      setIsLikeAnimating(true);
      likePost(post.id);
      setTimeout(() => setIsLikeAnimating(false), 1000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <span className="font-semibold text-sm hover:underline cursor-pointer">
              {post.user.username}
            </span>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post Image */}
      <div 
        className="relative pb-[100%]"
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={post.imageUrl}
          alt="Post"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {isLikeAnimating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <Heart className="w-24 h-24 text-white fill-white animate-scale-up" />
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => likePost(post.id)}
              className="flex items-center focus:outline-none group"
            >
              <Heart 
                className={`w-7 h-7 transition-transform group-hover:scale-110 ${
                  post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700 hover:text-gray-900'
                }`} 
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center focus:outline-none group"
            >
              <MessageCircle className="w-7 h-7 transition-transform group-hover:scale-110" />
            </button>
            <button className="flex items-center focus:outline-none group">
              <Send className="w-7 h-7 transition-transform group-hover:scale-110" />
            </button>
          </div>
          <button 
            onClick={() => savePost(post.id)}
            className="flex items-center focus:outline-none group"
          >
            <Bookmark 
              className={`w-7 h-7 transition-transform group-hover:scale-110 ${
                post.isSaved ? 'fill-black text-black' : 'text-gray-700 hover:text-gray-900'
              }`} 
            />
          </button>
        </div>
        
        {/* Likes */}
        <div className="mb-2">
          <p className="font-semibold text-sm">{post.likes.toLocaleString()} likes</p>
        </div>
        
        {/* Caption */}
        <div className="mb-3">
          <p className="text-sm">
            <span className="font-semibold mr-2 hover:underline cursor-pointer">
              {post.user.username}
            </span>
            {post.caption}
          </p>
        </div>
        
        {/* Comments */}
        {post.comments.length > 0 && (
          <button 
            className="text-gray-500 text-sm mb-2 hover:text-gray-700"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments 
              ? 'Hide comments' 
              : `View all ${post.comments.length} comments`
            }
          </button>
        )}
        
        {showComments && (
          <div className="space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-thin">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img 
                  src={comment.user.avatar}
                  alt={comment.user.username}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold mr-2 hover:underline cursor-pointer">
                      {comment.user.username}
                    </span>
                    {comment.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="flex items-center pt-3 border-t">
          <TextareaAutosize
            placeholder="Add a comment..."
            className="flex-1 text-sm resize-none bg-transparent focus:outline-none max-h-20"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            minRows={1}
            maxRows={5}
          />
          <button
            type="submit"
            className={`ml-2 text-blue-500 font-semibold text-sm ${
              !comment.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'
            }`}
            disabled={!comment.trim()}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;