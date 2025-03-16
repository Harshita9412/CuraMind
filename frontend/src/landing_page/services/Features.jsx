import React from "react";
import "./Features.css";

const Features = ({ setShowChatbot }) => {
  const features = [
    { id: 1, image: "/media/images/chatbot.jpg", name: "Chatbot" },
    { id: 2, image: "/media/images/video_assistant.avif", name: "Video Assistant" },
    { id: 3, image: "/media/images/device_support.jpg", name: "Device Support" },
  ];

  const handleCardClick = (id) => {
    if (id === 1) {
      setShowChatbot(true);
    }
  };

  return (
    <div className="features">
      <h2>Our Featured Services</h2>
      <div className="card-row">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="card"
            onClick={() => handleCardClick(feature.id)}
          >
            <img src={feature.image} alt={feature.name} />
            <h3>{feature.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
