import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Story } from '../types';

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const [progress, setProgress] = useState(0);
  const story = stories[currentIndex];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [currentIndex, onNext]);
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Story Header */}
      <div className="p-4 absolute top-0 left-0 right-0 z-10 flex items-center justify-between">
        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <button 
          className="ml-4 text-white" 
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Story Content */}
      <div 
        className="flex-1 bg-black flex items-center justify-center"
        onClick={onNext}
      >
        {story && (
          <div className="relative w-full h-full">
            <img
              src={story.imageUrl}
              alt="Story"
              className="absolute inset-0 w-full h-full object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center">
                <img
                  src={story.user.avatar}
                  alt={story.user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2 text-white font-semibold">
                  {story.user.username}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Areas */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div 
          className="w-1/2 h-full pointer-events-auto"
          onClick={onPrevious}
        />
        <div 
          className="w-1/2 h-full pointer-events-auto"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default StoryViewer;