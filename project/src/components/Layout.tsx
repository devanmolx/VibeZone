import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Social App</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button 
              onClick={() => {}} 
              className="w-full bg-blue-500 text-white py-2 rounded-md font-medium"
            >
              Log in
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Don't have an account? <span className="text-blue-500">Sign up</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden">
        <Navbar />
      </div>
      
      <div className="flex min-h-screen pt-14 md:pt-0">
        {/* Sidebar for tablet and desktop */}
        <div className="hidden md:block w-[72px] xl:w-64 fixed h-full border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-[72px] xl:ml-64">
          <div className="max-w-3xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;