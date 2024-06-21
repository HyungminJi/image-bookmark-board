import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Unsplash Clone</Link>
      <Link to="/bookmarks" className="bookmark-link">Bookmarks</Link>
    </header>
  );
};

export default Header;