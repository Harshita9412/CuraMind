import React from "react";
import "./Chatbot.css";

const Chatbot = ({ setShowChatbot }) => {
  return (
    <div className="chatbot-container">
      <button className="close-btn" onClick={() => setShowChatbot(false)}>×</button>
      <div className="chatbot-box">
        <h3>Welcome to Chatbot</h3>
        <p>How can I assist you today?</p>
      </div>
    </div>
  );
};

export default Chatbot;
