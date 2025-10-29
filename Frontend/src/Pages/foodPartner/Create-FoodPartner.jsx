import React, { useRef, useState } from "react";
import styles from "./CreateFood.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();
  const videoInputRef = useRef();
  const [videoName, setVideoName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();  // page reload rokne k liye 

    // validation
    if (!videoFile || !foodName || !foodDescription) {
      alert("Please fill all fields and upload a video.");
      return;
    }
    // FormData object to send file and data
    const formData=new FormData();
    formData.append("name",foodName);
    formData.append("description",foodDescription);
    formData.append("file",videoFile);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:2000/api/food/create", formData, {
        headers: {"Content-Type": "multipart/form-data" },withCredentials:true
      });
      console.log("Food item created:", res.data);
      navigate("/"); 
      setLoading(false);
      alert("Food item created successfully!");
      // Reset form
      setFoodName("");
      setFoodDescription("");
      setVideoName("");
      setVideoFile(null);
      }catch (err) {
      setLoading(false);
      console.error( err.response ? err.response.data : err.message);
      alert("Failed to create food item. Please try again.")
      }
    }
  

  return (
    <div className={styles.wrapper}>
      {/* 🔹 Background video */}
      <video
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        src="/assets/food-bg.mp4" // put your video in public/assets
      ></video>

      {/* 🔹 Floating emojis */}
      <div className={styles.floatingEmojis}>
        <span>🍕</span>
        <span>🍔</span>
        <span>🍣</span>
        <span>🍩</span>
        <span>🥗</span>
      </div>

      {/* 🔹 Overlay gradient */}
      <div className={styles.overlay}></div>

      {/* 🔹 Glass form container */}
      <form className={styles.createFoodCard} onSubmit={handleSubmit}>
        <div className={styles.createFoodHeader}>
          <div className={styles.createFoodTitle}>Create New Food Item</div>
          <p className={styles.createFoodSubtitle}>
            Upload a short video, give it a name and description.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="foodVideo">
            Food Video
          </label>
          <div className={styles.customVideoInputWrapper}>
            <button
              type="button"
              className={styles.videoInputBtn}
              onClick={() => videoInputRef.current.click()}
              aria-label="Upload food video"
            >
              {/* SVG upload icon */}
              <svg viewBox="0 0 48 48" width="38" height="38" fill="none">
                <rect width="48" height="48" rx="12" fill="none" />
                <path
                  d="M24 34V16M24 16l-7 7M24 16l7 7"
                  stroke="#4dd0e1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="10"
                  y="34"
                  width="28"
                  height="6"
                  rx="3"
                  fill="#00c6ff"
                  opacity=".18"
                />
              </svg>
              <span className={styles.tapToUploadText}>Tap to upload</span>
              <span className={styles.videoInputText}>
                {videoName || "No file chosen"}
              </span>
            </button>
            <input
              className={styles.inputVideo}
              type="file"
              id="foodVideo"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={(e) =>{
                setVideoName(e.target.files[0]?.name || "");
                setVideoFile(e.target.files[0] || null)

              }}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="foodName">
            Name
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="foodName"
            placeholder="Enter food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="foodDescription">
            Description
          </label>
          <textarea
            className={styles.inputField}
            id="foodDescription"
            placeholder="Enter food description"
            rows={3}
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
          />
        </div>
 
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Food"}
          
        </button>
      </form>
    </div>
  );
};

export default CreateFood;





















// import React, { useRef, useState } from "react";
// import styles from "./CreateFood.module.css";

// const CreateFood = () => {
//     const videoInputRef = useRef();
//     const [videoName, setVideoName] = useState("");

//     return (
//         <div className={styles.createFoodContainer}>
//             <form className={styles.createFoodCard}>
//                 <div className={styles.createFoodTitle}>Create New Food Item</div>
//                 <div className={styles.inputGroup}>
//                     <label className={styles.inputLabel} htmlFor="foodVideo">Food Video</label>
//                     <div className={styles.customVideoInputWrapper}>
//                         <button
//                             type="button"
//                             className={styles.videoInputBtn}
//                             onClick={() => videoInputRef.current.click()}
//                             aria-label="Upload food video"
//                         >
//                             {/* SVG upload icon */}
//                             <svg viewBox="0 0 48 48" width="38" height="38" fill="none"><rect width="48" height="48" rx="12" fill="none"/><path d="M24 34V16M24 16l-7 7M24 16l7 7" stroke="#4dd0e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="34" width="28" height="6" rx="3" fill="#00c6ff" opacity=".18"/></svg>
//                             <span className={styles.tapToUploadText}>Tap to upload</span>
//                             <span className={styles.videoInputText}>{videoName || "No file chosen"}</span>
//                         </button>
//                         <input
//                             className={styles.inputVideo}
//                             type="file"
//                             id="foodVideo"
//                             accept="video/*"
//                             ref={videoInputRef}
//                             style={{ display: "none" }}
//                             onChange={e => setVideoName(e.target.files[0]?.name || "")}
//                         />
//                     </div>
//                 </div>
//                 <div className={styles.inputGroup}>
//                     <label className={styles.inputLabel} htmlFor="foodName">Name</label>
//                     <input
//                         className={styles.inputField}
//                         type="text"
//                         id="foodName"
//                         placeholder="Enter food name"
//                     />
//                 </div>
//                 <div className={styles.inputGroup}>
//                     <label className={styles.inputLabel} htmlFor="foodDesc">Description</label>
//                     <textarea
//                         className={styles.inputField}
//                         id="foodDesc"
//                         placeholder="Enter food description"
//                         rows={3}
//                     />
//                 </div>
//                 <button className={styles.submitBtn} type="submit">Create Food</button>
//             </form>
//         </div>
//     );
// }

// export default CreateFood;