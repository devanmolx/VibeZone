import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: mockUsers[1],
      content: 'liked your photo',
      time: '3h',
      isFollowing: true,
    },
    {
      id: '2',
      type: 'follow',
      user: mockUsers[2],
      content: 'started following you',
      time: '1d',
      isFollowing: false,
    },
    {
      id: '3',
      type: 'comment',
      user: mockUsers[1],
      content: 'commented: "Amazing photo!"',
      time: '2d',
      isFollowing: true,
    },
    {
      id: '4',
      type: 'mention',
      user: mockUsers[2],
      content: 'mentioned you in a comment',
      time: '3d',
      isFollowing: true,
    },
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === 'follow');

  return (
    <div className="py-4 px-4 mb-16 md:mb-0">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`pb-2 px-4 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-black'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium ${
            activeTab === 'follow'
              ? 'border-b-2 border-black'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('follow')}
        >
          Follows
        </button>
      </div>
      
      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="flex items-center">
            <img
              src={notification.user.avatar}
              alt={notification.user.username}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.user.username}</span>{' '}
                {notification.content}{' '}
                <span className="text-gray-500">{notification.time}</span>
              </p>
            </div>
            {notification.type === 'follow' && (
              <button
                className={`px-3 py-1.5 text-sm font-semibold rounded ${
                  notification.isFollowing
                    ? 'bg-gray-200 text-black'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {notification.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;