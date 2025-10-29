import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setSavedVideos(stored);
  }, []);

  const removeSaved = (id) => {
    const updated = savedVideos.filter((v) => v._id !== id);
    setSavedVideos(updated);
    localStorage.setItem("savedVideos", JSON.stringify(updated));
  };

  return (
    <div className="saved-page">
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "20px" }}>
        Saved Videos
      </h2>

      {savedVideos.length === 0 ? (
        <p style={{ color: "#ccc", textAlign: "center", marginTop: "30%" }}>
          Your saved videos will appear here.
        </p>
      ) : (
        <div className="video-list">
          {savedVideos.map((video) => (
            <div key={video._id} className="video-card">
              <video
                src={video.video}
                controls
                style={{ width: "100%", borderRadius: "10px" }}
              ></video>
              <p style={{ color: "#fff", textAlign: "center" }}>
                {video.description}
              </p>
              <Link
                to={"/food-partner/" + video.foodPartner}
                className="visit-store-btn"
              >
                Visit Store
              </Link>
              <button
                onClick={() => removeSaved(video._id)}
                className="remove-btn"
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
