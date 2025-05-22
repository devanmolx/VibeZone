import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Heart, MessageSquare, PlusSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/notifications', icon: Heart, label: 'Notifications' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/create', icon: PlusSquare, label: 'Create' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6">
        <Link to="/" className="block">
          <h1 className="font-bold text-2xl xl:block hidden">Social App</h1>
          <span className="xl:hidden block text-2xl font-bold">S</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gray-100 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isActive(item.path) ? 'text-blue-500' : 'text-gray-700'
                  }`}
                />
                <span className={`ml-4 hidden xl:block ${
                  isActive(item.path) ? 'text-blue-500' : 'text-gray-700'
                }`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t">
        {user && (
          <div className="flex flex-col space-y-4">
            <Link
              to="/profile"
              className="flex items-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 hidden xl:block">
                <p className="font-medium text-sm">{user.username}</p>
                <p className="text-xs text-gray-500">{user.fullName}</p>
              </div>
            </Link>
            
            <button
              onClick={logout}
              className="flex items-center p-2 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-6 h-6" />
              <span className="ml-4 hidden xl:block">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;