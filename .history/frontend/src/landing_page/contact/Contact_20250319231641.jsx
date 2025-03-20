import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting
import "./Contact.css"; // Keep your original styles

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate(); // For redirecting after submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const contactData = { name, email, message };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}contact/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit contact details");
      }

      setSubmitted(true);
      setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h2 className="form-title">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        {submitted && <p className="success-message">Thank you! Your message has been submitted. 😊</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Contact;
