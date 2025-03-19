import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError("Failed to fetch reviews. Please try again later.");
      }
    };

    fetchReviews();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    setError("");

    if (!newName || !newComment || newRating < 1 || newRating > 5) return;

    const newReview = { name: newName, rating: newRating, comment: newComment };

    try {
      const response = await fetch('/api/reviews/add', {
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

      setNewName("");
      setNewRating(1);
      setNewComment("");
    } catch (error) {
      setError("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div className="reviews-container">
      <section className="reviews-section">
        <h2 className="reviews-title">What Our Clients Say</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <h3 className="review-name">{review.name}</h3>
                <div className="review-rating">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="add-review-section">
        <h3 className="add-review-title">Add Your Review</h3>
        <form onSubmit={handleAddReview} className="add-review-form">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Your Name"
            required
            className="input-field"
          />
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="input-field"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Star{star > 1 ? "s" : ""}</option>
            ))}
          </select>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Your Comment"
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </section>
    </div>
  );
};

export default Reviews;
