import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Blog from './pages/Blogs.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </>
  )
}

export default App;
