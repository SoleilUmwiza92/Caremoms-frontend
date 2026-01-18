import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';

import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
// import Feed from './pages/Feed'; // when you have it

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected section */}
          <Route element={<ProtectedRoute />}>
            <Route path="chatroom" element={<ChatRoom/>} />
            <Route path="/profile" element={<Profile />} />
{/*             <Route path="/feed" element={<Feed />} /> */}
            <Route path="/" element={<Navigate to="/profile" replace />} />
           </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
