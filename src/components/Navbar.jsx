import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profiles } from '../data/videos';
import { SearchRegular } from '@fluentui/react-icons';

const Navbar = ({ onSearchOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--solid' : 'navbar--transparent'}`}>
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">SUFLETFLIX</Link>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
            Home
          </Link>
          <Link to="/our-story" className={`navbar__link ${isActive('/our-story') ? 'navbar__link--active' : ''}`}>
            Our Story
          </Link>
          <Link to="/favorites" className={`navbar__link ${isActive('/favorites') ? 'navbar__link--active' : ''}`}>
            Favorites
          </Link>
          <Link to="/categories" className={`navbar__link ${isActive('/categories') ? 'navbar__link--active' : ''}`}>
            Categories
          </Link>
        </div>
      </div>

      <div className="navbar__right">
        <button className="navbar__search-btn" onClick={onSearchOpen} aria-label="Search">
          <SearchRegular fontSize={20} />
        </button>
        <div className="navbar__profiles">
          {profiles.map(p => (
            <div key={p.id} className="navbar__profile-avatar" title={p.name}>
              <img src={p.avatar} alt={p.name} className="navbar__profile-img" />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
