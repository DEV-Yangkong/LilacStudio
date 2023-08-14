import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./components/Pages/Home/Home";

import TeamIntroduction from "./components/Pages/TeamIntroduction/TeamIntroduction";

import News from "./components/Pages/News/News";
import NoticeBoard from "./components/Pages/News/NoticeBoard/NoticeBoard";
import WritePostNB from "./components/Pages/News/NoticeBoard/WritePostNB";

import GameInfo from "./components/Pages/GameInfo/GameInfo";

import Community from "./components/Pages/Community/Community";

import Media from "./components/Pages/Media/Media";
import YouTube from "./components/Pages/Media/YouTube/YouTubeList";
import WritePostYT from "./components/Pages/Media/YouTube/WritePostYT";

import WebShop from "./components/Pages/WebShop/WebShop";

import CustomerService from "./components/Pages/CustomerService/CustomerService";

import PrivacyPolicy from "./components/Pages/FooterPage/PrivacyPolicy";
import TermsOfUse from "./components/Pages/FooterPage/TermsOfUse";
import Login from "./components/Pages/Login/Login";
import Signup from "./components/Pages/Login/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 팀 소개 */}
          <Route
            path="/team-introduction/team-introduction"
            element={<TeamIntroduction />}
          />
          <Route path="/team-introduction" element={<TeamIntroduction />} />

          {/* 새 소식 */}
          <Route path="/news" element={<News />} />
          <Route path="/news/notice-board" element={<NoticeBoard />} />
          <Route
            path="/news/notice-board/write-post-nb"
            element={<WritePostNB />}
          />

          {/* 게임 정보 */}
          <Route path="/game-info" element={<GameInfo />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<Community />} />

          {/* 미디어 */}
          <Route path="/media" element={<Media />} />
          <Route path="/media/youtube" element={<YouTube />} />
          <Route
            path="/media/youtube/write-post-yt"
            element={<WritePostYT />}
          />

          {/* 웹샵 */}
          <Route path="/web-shop" element={<WebShop />} />

          {/* 고객센터 */}
          <Route path="/customer-service" element={<CustomerService />} />

          {/* 푸터 */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />

          {/* 회원 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
