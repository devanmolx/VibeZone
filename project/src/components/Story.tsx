import React from 'react';
import { Story as StoryType } from '../types';

interface StoryProps {
  story: StoryType;
  onView?: () => void;
}

const Story: React.FC<StoryProps> = ({ story, onView }) => {
  const { user, isViewed } = story;

  return (
    <div className="flex flex-col items-center space-y-1" onClick={onView}>
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isViewed ? 'bg-gray-200' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
        } p-[2px]`}
      >
        <div className="bg-white rounded-full p-[2px] w-full h-full">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-center truncate w-16">
        {user.username}
      </span>
    </div>
  );
};

export default Story;