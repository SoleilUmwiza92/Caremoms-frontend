import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Chat from "./components/Chat.jsx";

import "./App.css";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://caremoms.up.railway.app/api";

console.log("API Base URL:", API_BASE_URL);

function App() {
  const [nickname, setNickname] = useState("");
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState([]);

  // Poll messages
  useEffect(() => {
    if (!nickname) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chat`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchMessages(); // Load immediately
    const interval = setInterval(fetchMessages, 1500);
    return () => clearInterval(interval);
  }, [nickname]);

  // Send message
  const sendMessage = async (msgText) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          content: msgText,
        }),
      });

      return res.ok;
    } catch (err) {
      console.error("Send error:", err);
      return false;
    }
  };

  // Nickname screen
  if (!nickname) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter your nickname</h2>
        <input
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder="Your nickname..."
        />
        <button
          onClick={() => tempName.trim() && setNickname(tempName.trim())}
        >
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <Chat
      nickname={nickname}
      messages={messages}
      onSend={sendMessage}
    />
  );
}

export default App;