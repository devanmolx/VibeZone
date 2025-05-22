export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
  timestamp: string;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  timestamp: string;
  isViewed: boolean;
}