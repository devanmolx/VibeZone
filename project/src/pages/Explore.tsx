import React from 'react';
import { Search } from 'lucide-react';
import { mockExplore } from '../data/mockData';

const Explore: React.FC = () => {
  return (
    <div className="py-4 px-4 mb-16 md:mb-0">
      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex mb-6 max-w-md mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-lg py-2 px-4 pl-10"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </div>
      
      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1">
        {mockExplore.map((post) => (
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

export default Explore;