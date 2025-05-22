import React, { useState, useRef } from 'react';
import { Image, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [caption, setCaption] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !previewImage || !caption.trim()) return;
    
    setIsSubmitting(true);
    
    // For this demo, we're using the preview image directly
    // In a real app, you'd upload to a server first
    createPost({
      user,
      imageUrl: previewImage,
      caption,
      likes: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
      timestamp: new Date().toISOString(),
    });
    
    navigate('/');
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const clearImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="py-4 px-4 mb-16 md:mb-0 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Create New Post</h1>
      
      <form onSubmit={handleSubmit}>
        {!previewImage ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={triggerFileInput}
          >
            <Image className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload a photo</h2>
            <p className="text-gray-500 mb-4">
              Drag and drop or click to upload
            </p>
            
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded font-semibold"
            >
              Select from computer
            </button>
          </div>
        ) : (
          <div className="mb-6 relative">
            <button
              type="button"
              className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full"
              onClick={clearImage}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <textarea
            rows={4}
            placeholder="Write a caption..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold ${
            previewImage && caption.trim()
              ? 'bg-blue-500 text-white'
              : 'bg-blue-200 text-white cursor-not-allowed'
          }`}
          disabled={!previewImage || !caption.trim() || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Share'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;