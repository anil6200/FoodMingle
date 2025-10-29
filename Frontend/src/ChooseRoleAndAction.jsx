import React, { useState } from "react";
import UserRegister from "./Pages/UserRegister";
import UserLogin from "./Pages/UserLogin";
import FoodPartnerRegister from "./Pages/FoodPartnerRegister";
import FoodPartnerLogin from "./Pages/FoodPartnerLogin";
import "./design.css";

const ChooseRoleAndAction = () => {
  const [role, setRole] = useState("");
  const [action, setAction] = useState("");

  const renderComponent = () => {
    if (role === "user") {
      if (action === "register") return <UserRegister />;
      if (action === "login") return <UserLogin />;
    }
    if (role === "foodpartner") {
      if (action === "register") return <FoodPartnerRegister />;
      if (action === "login") return <FoodPartnerLogin />;
    }
    return null;
  };

  // Floating bubbles - only for role/action selection
  const renderBubbles = () => {
    if (action) return null; // hide on register/login page
    return (
      <>
        <div className="food-bubble bubble-small" style={{ top: "10%", left: "5%", animationDuration: "5s" }}>🍔</div>
        <div className="food-bubble bubble-medium" style={{ top: "20%", right: "10%", animationDuration: "7s" }}>🍕</div>
        <div className="food-bubble bubble-small" style={{ top: "50%", left: "30%", animationDuration: "6s" }}>🥤</div>
        <div className="food-bubble bubble-medium" style={{ top: "70%", right: "25%", animationDuration: "8s" }}>🍟</div>
        <div className="food-bubble bubble-large" style={{ top: "85%", left: "50%", animationDuration: "9s" }}>🍣</div>
        <div className="food-bubble bubble-medium" style={{ top: "40%", left: "70%", animationDuration: "7s" }}>🍕</div>
        <div className="food-bubble bubble-small" style={{ top: "25%", right: "50%", animationDuration: "6s" }}>🥤</div>
      </>
    );
  };

  if (!role) {
    return (
      <div className="choose-container">
        {renderBubbles()}

        <div className="title-box">
          <h1 className="title">🚀 Welcome to FoodMingle</h1>
          <p className="subtitle">Please select your role to continue</p>
        </div>

        <div className="card-wrapper">
          <div className="role-card" onClick={() => setRole("user")}>
            <h2>👤 Normal User</h2>
            <p>Order food, track your deliveries, and enjoy meals.</p>
          </div>

          <div className="role-card" onClick={() => setRole("foodpartner")}>
            <h2>🍴 Food Partner</h2>
            <p>Register your restaurant and manage your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!action) {
    return (
      <div className="choose-container">
        {renderBubbles()}

        <div className="title-box">
          <h1 className="title">{role === "user" ? "👤 Normal User" : "🍴 Food Partner"}</h1>
          <p className="subtitle">Choose an action</p>
        </div>

        <div className="card-wrapper">
          <div className="role-card" onClick={() => setAction("register")}>
            <h2>📝 Register</h2>
            <p>Create a new account to get started</p>
          </div>

          <div className="role-card" onClick={() => setAction("login")}>
            <h2>🔑 Login</h2>
            <p>Access your existing account</p>
          </div>
        </div>

        <button className="back-btn" onClick={() => setRole("")}>
          ⬅ Go Back
        </button>
      </div>
    );
  }

  return <div>{renderComponent()}</div>;
};

export default ChooseRoleAndAction;
