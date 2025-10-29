import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
import { FaHeart, FaRegBookmark, FaRegCommentDots, FaHome, FaBookmark } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);

  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/food/fetch", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setVideos(response.data.foodItems);
      })
      .catch((err) => console.error(err));
      const stored = JSON.parse(localStorage.getItem("savedVideos")) || [];
      setSavedVideos(stored);
  }, []); // run only once

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };
  useEffect(()=> {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(()=> {});
                }else {
                    video.pause();
                }
            });
        },{ threshold: 0.6 }   // 60% of the video should be visible to play
    );
    videoRefs.current.forEach((video) =>observer.observe(video) );
    return () => {
        videoRefs.current.forEach((video) => observer.unobserve(video) );
    }
    
  },[videos]);

  // const handleLike = async (videoId) => {
  //   try{
  //     const isLiked = likedVideos.includes(videoId);
  //     const response = await axios.post("http://localhost:2000/api/food/like",{
  //       foodId:videoId},
  //       { withCredentials: true}
        
  //     );
  //     /*update like count in frontend */
  //     setVideos((preVideos) =>
  //      preVideos.map((v) =>
  //     v._id === videoId ? { ...v, likeCount:isLiked ? v.likeCount -1 : v.likeCount +1, }: v));
  //     if (isLiked) {
  //       setLikedVideos((pre)=> pre.filter((id) => id !== videoId));
  //     }else{setLikedVideos((pre)=> [...pre, videoId]);}
  //     console.log(response.data.message);
  //   }catch (err) {
  //     console.error("Like error:",err.response ? err.response.data : err.message);
  //   }
    
  // }
   const handleLike = async (videoId) => {
    try{
      const response = await axios.post("http://localhost:2000/api/food/like",{
        foodId:videoId
      },{withCredentials: true});
      setVideos(prev=>
        prev.map(v=>
          v._id===videoId ? {...v, likeCount:response.data.newLike ? v.likeCount +1 : v.likeCount -1}: v
        )
      );
      setLikedVideos(prev=>
        prev.includes(videoId) ? prev.filter(id=> id !== videoId) : [...prev, videoId]

      )
    }catch(err){
      console.error("Like error:", err.response ? err.response.data : err.message)
    }
   }


   const handleSave = async (video) => {
    try {
      const alreadySaved=savedVideos.some((v)=>v._id===video._id)
      await axios.post(
        "http://localhost:2000/api/food/save",
        { foodId: video._id },
        { withCredentials: true }
      );
  
    
  
      // Update count
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === video._id
            ? {
                ...v,
                saveCount: alreadySaved
                ? Math.max((v.saveCount || 1) - 1, 0)
                : (v.saveCount || 0) + 1,
              }
            : v
        )
      );
  
      // Update saved videos list (with full object, not just ID)
    const updated=alreadySaved
    ? savedVideos.filter((v) => v._id !== video._id)
    : [...savedVideos, video];
    setSavedVideos(updated);
    localStorage.setItem("savedVideos", JSON.stringify(updated));
    } catch (err) {
      console.error("Save error:", err.response ? err.response.data : err.message);  
  }
};


const isVideoSaved=(id) => Array.isArray(savedVideos) && savedVideos.some((v) => v._id === id);
  
  











  // const handleSave = async (videoId) => {
  //   try{
  //     const isSaved= savedVideos.includes(videoId);
  //     const response = await axios.post("http://localhost:2000/api/food/save",{
  //       foodId:videoId
  //     },{ withCredentials: true });
  //     /* update save count in frontend */
  //     setVideos((preVideos) =>
  //     preVideos.map((v)=>
  //     v._id===videoId ? {...v,saveCount:isSaved ? (v.saveCount ?? 1) -1 : (v.saveCount ?? 0) +1}: v));
  //     if(isSaved)setVideos((prev)=> prev.filter((id) => id !== videoId));
  //     else setSavedVideos((pre)=> [...pre,videoId]);
  //     console.log(response.data.message);
  //   }catch(err) {
  //     console.error("Save error:", err.response ? err.response.data : err.message);
  //   }
  // }
  // const isVideoSaved=(id) => savedVideos.includes(id);

  /* Handle save and unsave */
//   const handleSave = (video) => {
//     let updated = [...savedVideos];
//     const alreadySaved= updated.some((v) => v._id === video._id);
//     if (alreadySaved) {
//       updated = updated.filter((v) => v._id !==video._id);
//   }else {
//     updated.push({
//       _id: video._id,
//       video: video.video,
//       description: video.description,
//       foodPartner: video.foodPartner
//     });
//   }
//   setSavedVideos(updated);
//   localStorage.setItem("savedVideos", JSON.stringify(updated));
// }
// const isVideoSaved = (id) => savedVideos.some((v)=> v._id === id);

  return (
    <div ref={containerRef} className="reels-container">
      {videos.length === 0 ? (
        <p style={{ color: "#fff", textAlign: "center", marginTop: "50%" }}>
          Loading videos...
        </p>
      ) : (
        videos.map((item) => (
          <section key={item._id} className="reel">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              playsInline
              loop
              preload="metadata"
            />
            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />
              <div className="reel-content">
                <p className="reel-description" title={item.description}>
                  {item.description}
                </p>
                <Link
                  className="visit-store-btn"
                  to={"/food-partner/" + item.foodPartner}
                  aria-label="Visit Store"
                >
                  Visit Store
                </Link>
              </div>
            </div>
            {/* Right-side icon bar */}
            <div className="reel-icons-bar">
              <button className="icon-btn" aria-label="Like" onClick={()=>handleLike(item._id)}
              style={{color:likedVideos.includes(item._id) ? "red":"white",}} ><FaHeart /></button>
              <span className="icon-count">{item.likeCount ?? 0 }</span>
              <button className="icon-btn" aria-label="Bookmark" onClick={()=>handleSave(item)} style={{
                color: isVideoSaved(item._id) ? "yellow" : "white",
              }} >{isVideoSaved(item._id) ? <FaBookmark /> : <FaRegBookmark />}</button>
              <span className="icon-count">
                {item.saveCount ?? 0}
              </span>
              <button className="icon-btn" aria-label="Comment"><FaRegCommentDots /></button>
              <span className="icon-count">0</span>
            </div>
          </section>
        ))
      )}
      {/* Bottom navigation bar */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-link" aria-label="Home"><FaHome /></Link>
        <Link to="/saved" className="nav-link" aria-label="saved"><FaBookmark /></Link>
      </nav>
    </div>
  );
};

export default Home;

  
// / const videos = [
// //   { id:'v1',
//     url: "https://ik.imagekit.io/Anil33/videos/a1280a7a-74c6-490a-9421-a441e4b01ef1_12837557-sd_540_960_25fps_1azplQbnQ.mp4",
//     description: "Sizzling noodles frying in a hot pan — smoky, steamy, and delicious!",
//     storeUrl: "#"
//   },
//   {  id:'v2',
//     url: "https://ik.imagekit.io/Anil33/videos/1b16003e-ef9d-49f6-a111-2258d01f3da4_food_dSFJE-9sG.mp4",
//     description: "Second store with another description. This one is also truncated to two lines.",
//     storeUrl: "#"
//   }
// ];

// const Home = () => {
//   return (
//     <div className="reels-container">
//       {videos.map((video, idx) => (
//         <div className="reel" key={idx}>
//           <video className="reel-video" src={video.url} controls autoPlay loop muted />
//           <div className="reel-overlay">
//             <div className="reel-description">{video.description}</div>
//             <button className="visit-store-btn" onClick={() => window.open(video.storeUrl, "_blank")}>Visit Store</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;/
