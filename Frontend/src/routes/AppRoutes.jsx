import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Apne components import karo
import ChooseRoleAndAction from "../ChooseRoleAndAction";
import UserRegister from "../Pages/UserRegister";
import UserLogin from "../Pages/UserLogin";
import FoodPartnerRegister from "../Pages/FoodPartnerRegister";
import FoodPartnerLogin from "../Pages/FoodPartnerLogin";
import Home from "../Pages/general/Home";
import CreateFood from "../Pages/foodPartner/Create-FoodPartner";
import Profile from "../Pages/foodPartner/Profile";
import Saved from "../Pages/general/Saved";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ChooseRole" element={<ChooseRoleAndAction />} />
        {/* User routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Food Partner routes */}
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path ="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
