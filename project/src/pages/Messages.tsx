import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Edit, Search, Send, Image, Smile, MessageCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDistanceToNow } from 'date-fns';
import { useMessages } from '../context/MessagesContext';

const Messages: React.FC = () => {
  const { chats, messages, selectedChat, selectChat, sendMessage } = useMessages();
  const [search, setSearch] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;
    
    sendMessage(selectedChat, newMessage.trim());
    setNewMessage('');
  };

  const filteredChats = chats.filter(chat =>
    chat.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex">
      {/* Chat List */}
      <div className="w-full md:w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Messages</h1>
              <ChevronDown className="w-5 h-5 ml-1" />
            </div>
            <button>
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-2 px-4 pl-10 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                selectedChat === chat.id ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative mr-3">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.unread && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{chat.user.username}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {messages[chat.id]?.[messages[chat.id]?.length - 1]?.text || chat.lastMessage}
                </p>
              </div>
              
              <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      {selectedChat ? (
        <div className="hidden md:flex flex-col flex-1 bg-white">
          {/* Chat Header */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <img
              src={chats.find(m => m.id === selectedChat)?.user.avatar}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="font-semibold text-sm">
                {chats.find(m => m.id === selectedChat)?.user.username}
              </h2>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages[selectedChat]?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.isOwn
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex items-end space-x-2">
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <Image className="w-6 h-6" />
              </button>
              
              <div className="flex-1 bg-gray-100 rounded-2xl">
                <TextareaAutosize
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message..."
                  className="w-full bg-transparent px-4 py-2 text-sm resize-none focus:outline-none"
                  minRows={1}
                  maxRows={5}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
              
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <Smile className="w-6 h-6" />
              </button>
              
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`text-blue-500 ${
                  !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'
                }`}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
            <p className="text-gray-500 mb-4">
              Send private messages to a friend or group
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;