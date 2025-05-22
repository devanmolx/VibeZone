import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-10">
      <div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
        {showSearch ? (
          <div className="flex-1 flex items-center">
            <button 
              className="mr-3 text-sm font-semibold"
              onClick={() => setShowSearch(false)}
            >
              Cancel
            </button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-100 rounded-lg py-2 px-3 pl-9 text-sm"
                autoFocus
              />
              <Search className="absolute left-2 top-2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <>
            <Link to="/" className="text-xl font-semibold">
              Social App
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowSearch(true)}>
                <Search className="w-6 h-6" />
              </button>
              <Link to="/notifications">
                <Heart className="w-6 h-6" />
              </Link>
              <Link to="/messages">
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;