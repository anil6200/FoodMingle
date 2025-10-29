import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "../Design.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate=useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    try{
      const res=await axios.post("http://localhost:2000/api/food-partner/login",{
        email,
        password
      },{headers:{"Content-Type":"application/json"},
    withCredentials:true});
    console.log("Success",res.data);
    navigate("/create-food");
    }catch(err){
      console.error("Server Error:", err.response ? err.response.data : err.message);
    }
      }
      return (
        <div className="dark-auth-page">
          <div className="dark-auth-card">
            <div className="auth-logo">🍴</div>
            <h2 className="dark-title">Welcome Back Partner</h2>
            <p className="dark-subtitle">Login to manage your restaurant</p>
    
            <form className="dark-form" onSubmit={handleSubmit}>
              <div className="dark-input">
                <input type="email" name="email" placeholder="Email" required />
              </div>
    
              <div className="dark-input">
                <input type="password" name="password" placeholder="Password" required />
              </div>
    
              <button type="submit" className="arrow-btn" style={{ width: "100%" }}>
                Login →
              </button>
            </form>
    
            <div className="divider"><span>OR</span></div>
    
            <button type="button" className="social-btn google">
              <FaGoogle /> Continue with Google
              <span className="arrow">→</span>
            </button>
    
            <button type="button" className="social-btn github">
              <FaGithub /> Continue with GitHub
              <span className="arrow">→</span>
            </button>
    
            <p className="dark-footer">
              Don’t have an account? <a href="/food-partner/register">Create Account</a>
            </p>
          </div>
        </div>
      );
    
}
    export default FoodPartnerLogin;
    
    
  
 