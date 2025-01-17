import React, { useEffect, useState } from "react";
import api from "../api"; // Axios yapılandırmasını içeren dosyayı import edin.

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Feedback verilerini tutmak için state
  const [loading, setLoading] = useState(true); // Yüklenme durumunu göstermek için state
  const [error, setError] = useState(null); // Hata durumunu göstermek için state

  useEffect(() => {
    // Feedback verilerini backend'den al
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("appointment/feedbacks/"); // API endpoint
        setFeedbacks(response.data); // Feedback verilerini state'e kaydet
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Feedbacks could not be loaded."); // Hata mesajını kaydet
      } finally {
        setLoading(false); // Yüklenme durumu tamamlandı
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <p>Loading feedbacks...</p>; // Yükleniyor mesajı
  }

  if (error) {
    return <p>{error}</p>; // Hata mesajı
  }
  const getImageUrl = (imagePath) => {
    const baseUrl = "http://localhost:8000"; // Backend'deki base URL
    return `${baseUrl}${imagePath}`; // Tam URL'yi döndür
  };

  return (
    <div>
      <h1>All Feedbacks</h1>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <p>
                <strong>User:</strong> {feedback.user || "Anonymous"}
              </p>
              <p>
                <strong>Comment:</strong> {feedback.comment}
              </p>

              <p>
                {feedback.image && ( // Eğer görsel varsa göster
                  <img
                    src={`http://localhost:8000${feedback.image}`}
                    alt="Feedback"
                    style={{ width: "200px", height: "auto" }}
                  />
                )}
                <img src={getImageUrl(feedback.image)} alt={feedback.comment} />
                <img
                  src={getImageUrl(feedback.image)}
                  alt={feedback.comment}
                  style={{ width: "100px", height: "100px" }} // Resmi boyutlandırmak için
                />
              </p>
              <img
                src={getImageUrl(feedback.image)}
                alt={feedback.comment}
                style={{ width: "150px", height: "150px", objectFit: "cover" }} // Resmin boyutlarını ayarlama
              />
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback available.</p> // Eğer feedback yoksa mesaj
      )}
    </div>
  );
};

export default FeedbackList;
