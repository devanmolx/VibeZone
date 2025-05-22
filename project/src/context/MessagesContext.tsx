import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockMessages } from '../data/mockData';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface MessagesContextType {
  chats: Chat[];
  messages: Record<string, Message[]>;
  selectedChat: string | null;
  selectChat: (chatId: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(mockMessages);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1',
        text: "Hey, how are you doing?",
        timestamp: new Date().toISOString(),
        isOwn: false,
      },
      {
        id: '2',
        text: "I'm good, thanks! How about you?",
        timestamp: new Date().toISOString(),
        isOwn: true,
      },
    ],
    '2': [
      {
        id: '3',
        text: "Did you see my latest post?",
        timestamp: new Date().toISOString(),
        isOwn: false,
      },
    ],
  });

  const selectChat = (chatId: string) => {
    setSelectedChat(chatId);
    markAsRead(chatId);
  };

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: text,
              timestamp: new Date().toISOString(),
            }
          : chat
      )
    );
  };

  const markAsRead = (chatId: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, unread: false }
          : chat
      )
    );
  };

  // Simulate receiving messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const randomMessages = [
        "Hey! How's it going?",
        "Did you see that new movie?",
        "Want to grab coffee later?",
        "Check out this awesome photo I took!",
      ];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

      if (Math.random() > 0.7) { // 30% chance to receive a message
        const newMessage: Message = {
          id: Date.now().toString(),
          text: randomMessage,
          timestamp: new Date().toISOString(),
          isOwn: false,
        };

        setMessages(prev => ({
          ...prev,
          [randomChat.id]: [...(prev[randomChat.id] || []), newMessage],
        }));

        setChats(prev =>
          prev.map(chat =>
            chat.id === randomChat.id
              ? {
                  ...chat,
                  lastMessage: randomMessage,
                  timestamp: new Date().toISOString(),
                  unread: selectedChat !== chat.id,
                }
              : chat
          )
        );
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [chats, selectedChat]);

  return (
    <MessagesContext.Provider
      value={{
        chats,
        messages,
        selectedChat,
        selectChat,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};