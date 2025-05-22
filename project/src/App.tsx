import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import CreatePost from './pages/CreatePost';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import { MessagesProvider } from './context/MessagesContext';

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <MessagesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Feed />} />
                <Route path="explore" element={<Explore />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="messages" element={<Messages />} />
                <Route path="profile" element={<Profile />} />
                <Route path="create" element={<CreatePost />} />
              </Route>
            </Routes>
          </Router>
        </MessagesProvider>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;