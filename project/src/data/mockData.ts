import { User, Post, Story } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'johndoe',
  fullName: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  bio: 'Photography enthusiast | Travel lover | Coffee addict',
  followers: 1250,
  following: 420,
  posts: 142,
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    username: 'janedoe',
    fullName: 'Jane Doe',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Artist | Designer | Creative mind',
    followers: 2300,
    following: 350,
    posts: 97,
  },
  {
    id: '3',
    username: 'alexsmith',
    fullName: 'Alex Smith',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Tech enthusiast | Coder | Gamer',
    followers: 1850,
    following: 512,
    posts: 65,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[1],
    imageUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Beautiful sunset at the beach today! 🌅 #sunset #beach #vibes',
    likes: 423,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: '1',
        user: mockUsers[2],
        text: 'Amazing view! Where is this?',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        user: mockUsers[0],
        text: 'So beautiful! 😍',
        timestamp: new Date().toISOString(),
      },
    ],
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    user: mockUsers[2],
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Morning coffee and coding session ☕💻 #developer #coding #morningroutine',
    likes: 257,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: '3',
        user: mockUsers[1],
        text: 'What are you working on?',
        timestamp: new Date().toISOString(),
      },
    ],
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    user: mockUsers[0],
    imageUrl: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Exploring new places this weekend 🗺️ #travel #adventure #explore',
    likes: 589,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: '4',
        user: mockUsers[1],
        text: 'Looks amazing! Have fun!',
        timestamp: new Date().toISOString(),
      },
      {
        id: '5',
        user: mockUsers[2],
        text: 'I want to go there too!',
        timestamp: new Date().toISOString(),
      },
    ],
    timestamp: new Date().toISOString(),
  },
];

export const mockStories: Story[] = [
  {
    id: '1',
    user: mockUsers[0],
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: new Date().toISOString(),
    isViewed: false,
  },
  {
    id: '2',
    user: mockUsers[1],
    imageUrl: 'https://images.pexels.com/photos/799273/pexels-photo-799273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: new Date().toISOString(),
    isViewed: false,
  },
  {
    id: '3',
    user: mockUsers[2],
    imageUrl: 'https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timestamp: new Date().toISOString(),
    isViewed: true,
  },
];

export const mockMessages = [
  {
    id: '1',
    user: mockUsers[1],
    lastMessage: 'Hey, how are you doing?',
    timestamp: new Date().toISOString(),
    unread: true,
  },
  {
    id: '2',
    user: mockUsers[2],
    lastMessage: 'Did you see my latest post?',
    timestamp: new Date().toISOString(),
    unread: false,
  },
];

export const mockExplore = [
  ...mockPosts,
  {
    id: '4',
    user: mockUsers[1],
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Nature at its best 🌿 #nature #photography',
    likes: 723,
    isLiked: false,
    isSaved: false,
    comments: [],
    timestamp: new Date().toISOString(),
  },
  {
    id: '5',
    user: mockUsers[2],
    imageUrl: 'https://images.pexels.com/photos/799273/pexels-photo-799273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'City vibes 🏙️ #urban #city #streetphotography',
    likes: 487,
    isLiked: false,
    isSaved: false,
    comments: [],
    timestamp: new Date().toISOString(),
  },
  {
    id: '6',
    user: mockUsers[0],
    imageUrl: 'https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption: 'Food is life 🍕 #foodie #delicious',
    likes: 356,
    isLiked: false,
    isSaved: false,
    comments: [],
    timestamp: new Date().toISOString(),
  },
];