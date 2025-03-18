import React, { useState, useEffect, useRef } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true);  // New loading state

  const reviewsRef = useRef(null);

  // Fetch reviews when the component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
          method: 'GET',
          mode: 'no-cors' // Set no-cors mode to bypass CORS restrictions
        });

        if (!response.ok) throw new Error("Failed to fetch reviews");

        // Due to 'no-cors', you can't read the response data. Instead, you would need to use the backend with proper CORS handling.
        console.log("Fetched Reviews:", response); // This would not log actual data, but the response object.
        // Handle the response here after the backend fixes CORS issues.
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);  // Stop loading after data is fetched
      }
    };

    fetchReviews();
  }, []);

  // Handle review submission
  const handleAddReview = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!newName || !newComment || newRating < 1 || newRating > 5) return;

    const newReview = { name: newName, rating: newRating, comment: newComment };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save review");
      }

      const savedReview = await response.json();
      setReviews([savedReview.newReview, ...reviews]);

      // Clear form fields
      setNewName("");
      setNewRating(1);
      setNewComment("");

      // Scroll to the reviews section after submission
      setTimeout(() => {
        reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit the review. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;  // Loading state
  }

  return (
    <div className="reviews-container">
      <section className="reviews-section" ref={reviewsRef}>
        <h2 className="reviews-title">What Our Clients Say</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="reviews-list">
          
