import React, { createContext, useState, useContext } from 'react';
import { Post, Comment } from '../types';
import { mockPosts } from '../data/mockData';

interface PostsContextType {
  posts: Post[];
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  createPost: (post: Omit<Post, 'id'>) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const likePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  const savePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isSaved: !post.isSaved
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, comment: Comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
        }
        return post;
      })
    );
  };

  const createPost = (newPost: Omit<Post, 'id'>) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost
    };
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, likePost, savePost, addComment, createPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};