import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:2000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
           <img
           src={profile?.avatar || "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="avatar"
              className={styles.avatarImg} />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>
            {profile?.name || "Loading..."}
          </div>
          <div className={styles.profileAddress}>
            {profile?.Address || "Address not available"}
          </div>
          {/* Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total Meals</div>
              <div className={styles.statValue}>{profile?.totalMeals || 0}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Customers Served</div>
              <div className={styles.statValue}>{profile?.customersServed || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className={styles.videoGridContainer}>
        {videos.map((v, index) => (
          <div key={index} className={styles.videoGridItem}>
            <video src={v.video} muted autoPlay className={styles.gridVideo}></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;





















// import React, { useState, useEffect } from "react";
// import styles from "./Profile.module.css";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Profile = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     axios
//       .get(`http://localhost:2000/api/food-partner/${id}`, { withCredentials: true })
//       .then((response) => {
//         const fp = response.data.foodPartner;
//         setProfile(fp);
//         setVideos(fp.foodItems || []);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.profileCard}>
//         {/* Profile Top */}
//         <div className={styles.profileTop}>
//           <div className={styles.profileAvatar}>
//             {profile?.avatar ? (
//               <img
//                 src={profile.avatar}
//                 alt={profile?.name}
//                 className={styles.avatarImg}
//               />
//             ) : (
//               <span role="img" aria-label="avatar">🟢</span>
//             )}
//           </div>
//           <div className={styles.profileInfo}>
//             <button className={styles.profileNameBtn}>
//               {profile?.name || "Loading..."}
//             </button>
//             <button className={styles.profileAddressBtn}>
//               {profile?.Address || "Address not available"}
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className={styles.profileStats}>
//           <div className={styles.profileStat}>
//             <div className={styles.profileStatLabel}>Total Meals</div>
//             <div className={styles.profileStatValue}>{profile?.totalMeals || 0}</div>
//           </div>
//           <div className={styles.profileStat}>
//             <div className={styles.profileStatLabel}>Customers Served</div>
//             <div className={styles.profileStatValue}>{profile?.customersServed || 0}</div>
//           </div>
//         </div>

//         {/* Dynamic Video Grid */}
//         <div className={styles.profileGrid}>
//           {videos.map((v, index) => (
//             <div key={index} className={styles.profileGridItem}>
//               <video
//                 src={v.video}       // backend se direct video URL
//                 muted
//                 loop
//                 autoPlay
//                 className={styles.gridVideo}
//                 onMouseEnter={(e) => e.target.play()}
//                 onMouseLeave={(e) => e.target.pause()}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
