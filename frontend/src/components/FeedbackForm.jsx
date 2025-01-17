import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/feedback/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT Token
        },
      });
      if (response.status === 201) {
        setSuccess(true);
        setComment("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      {success && <p>Feedback submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your feedback"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
