import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import "./App.css";
// 헤더와 푸터
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./Pages/FooterPage/PrivacyPolicy";
import TermsOfUse from "./Pages/FooterPage/TermsOfUse";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
// 홈
import Home from "./Pages/Home/Home";
// 팀소개
import TeamIntroduction from "./Pages/TeamIntroduction/TeamIntroduction";
// 새소식
import News from "./Pages/News/News";
import NoticeBoard from "./Pages/News/NoticeBoard/NoticeBoard";
import NoticeBoardDetail from "./Pages/News/NoticeBoard/NoticeBoardDetail";
import WritePostNB from "./Pages/News/NoticeBoard/WritePostNB";
// 게임정보
import GameInfo from "./Pages/GameInfo/GameInfo";
// 커뮤니티
import Community from "./Pages/Community/Community";
// 미디어
import Media from "./Pages/Media/Media";
import YouTube from "./Pages/Media/YouTube/YouTubeList";
import YouTubeDetail from "./Pages/Media/YouTube/YouTubeDetail";
import WritePostYT from "./Pages/Media/YouTube/WritePostYT";
// 웹샵
import WebShop from "./Pages/WebShop/WebShop";
// 고객센터
import CustomerService from "./Pages/CustomerService/CustomerService";

// 모달 최상위 컴포넌트로 지정
Modal.setAppElement("#root");

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
            path="/news/notice-board/notice/:postId"
            element={<NoticeBoardDetail />}
          />
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
            path="/media/youtube/detail/:postId"
            element={<YouTubeDetail />}
          />
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
