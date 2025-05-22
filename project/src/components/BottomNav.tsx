import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-14 flex items-center justify-around">
      <Link to="/" className="flex flex-col items-center">
        <Home
          className={`w-6 h-6 ${
            isActive('/') ? 'fill-black stroke-black' : ''
          }`}
        />
      </Link>
      
      <Link to="/explore" className="flex flex-col items-center">
        <Search
          className={`w-6 h-6 ${
            isActive('/explore') ? 'fill-black stroke-black' : ''
          }`}
        />
      </Link>
      
      <Link to="/create" className="flex flex-col items-center">
        <PlusSquare
          className={`w-6 h-6 ${
            isActive('/create') ? 'fill-black stroke-black' : ''
          }`}
        />
      </Link>
      
      <Link to="/notifications" className="flex flex-col items-center">
        <Heart
          className={`w-6 h-6 ${
            isActive('/notifications') ? 'fill-black stroke-black' : ''
          }`}
        />
      </Link>
      
      <Link to="/profile" className="flex flex-col items-center">
        {user ? (
          <img
            src={user.avatar}
            alt={user.username}
            className={`w-7 h-7 rounded-full object-cover ${
              isActive('/profile') ? 'ring-2 ring-black' : ''
            }`}
          />
        ) : (
          <User className="w-6 h-6" />
        )}
      </Link>
    </nav>
  );
};

export default BottomNav;