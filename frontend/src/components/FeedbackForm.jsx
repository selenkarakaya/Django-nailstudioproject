import React, { useState } from "react";
import api from "../api";
import Button from "./Button";

const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const createFeedback = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image); //It is only added if selected.
    }

    try {
      const response = await api.post("appointment/feedback/", formData);
      if (response.status === 201) {
        setSuccess(true);
        setComment("");
        setImage(null);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div>
      {success && (
        <p style={{ color: "green" }}>Feedback submitted successfully!</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={createFeedback} className="form">
        <div className="form-group">
          <label htmlFor="comment">Your Feedback:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback here"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload an Image (optional):</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="text-center">
          <Button text="Submit" onClick={createFeedback} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
