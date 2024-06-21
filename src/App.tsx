import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import BookmarkPage from './components/BookmarkPage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Link to="/" className="logo">Unsplash Clone</Link>
          <Link to="/bookmarks" className="bookmark-button">Bookmarks</Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
