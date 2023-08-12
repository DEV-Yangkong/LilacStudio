import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./components/Pages/Home/Home";
import News from "./components/Pages/News/News";
import GameInfo from "./components/Pages/GameInfo/GameInfo";
import Community from "./components/Pages/Community/Community";
import Media from "./components/Pages/Media/Media";
import Webshop from "./components/Pages/Webshop/Webshop";
import CustomerService from "./components/Pages/CustomerService/CustomerService";
import TeamIntroduction from "./components/Pages/TeamIntroduction/TeamIntroduction";
import PrivacyPolicy from "./components/Pages/FooterPage/PrivacyPolicy";
import TermsOfUse from "./components/Pages/FooterPage/TermsOfUse";
import Login from "./components/Pages/Login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team-introduction" element={<TeamIntroduction />} />
          <Route path="/news" element={<News />} />
          <Route path="/game-info" element={<GameInfo />} />
          <Route path="/community" element={<Community />} />
          <Route path="/media" element={<Media />} />
          <Route path="/web-shop" element={<Webshop />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
