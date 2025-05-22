import React, { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';
import Story from '../components/Story';
import StoryViewer from '../components/StoryViewer';
import { mockStories } from '../data/mockData';

const Feed: React.FC = () => {
  const { posts } = usePosts();
  const [viewingStory, setViewingStory] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleViewStory = (index: number) => {
    setCurrentStoryIndex(index);
    setViewingStory(true);
  };

  const handleCloseStory = () => {
    setViewingStory(false);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < mockStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      handleCloseStory();
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className="py-4 px-4 mb-16 md:mb-0">
      {/* Stories */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {mockStories.map((story, index) => (
            <Story 
              key={story.id} 
              story={story} 
              onView={() => handleViewStory(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Story Viewer Modal */}
      {viewingStory && (
        <StoryViewer
          stories={mockStories}
          currentIndex={currentStoryIndex}
          onClose={handleCloseStory}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </div>
  );
};

export default Feed;