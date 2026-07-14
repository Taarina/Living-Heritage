import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { NAVIGATION } from '@/constants/testIds';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const navLinks = [
    { to: '/', label: 'Home', testId: NAVIGATION.homeLink },
    { to: '/collections', label: 'Collections', testId: NAVIGATION.collectionsLink },
    { to: '/explore', label: 'Explore', testId: NAVIGATION.exploreLink },
    { to: '/voices', label: 'Voices', testId: NAVIGATION.voicesLink },
    { to: '/about', label: 'About', testId: NAVIGATION.aboutLink }
  ];
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-archive-secondary ${
      isHome ? 'bg-archive-paper/95' : 'bg-archive-paper'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif text-archive-text transition-fast hover:text-archive-gold">
            Living Heritage
          </Link>
          
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={link.testId}
                className={`text-sm tracking-widest uppercase transition-fast ${
                  location.pathname === link.to
                    ? 'text-archive-gold'
                    : 'text-archive-text hover:text-archive-olive'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/search"
              data-testid={NAVIGATION.searchLink}
              className="text-archive-text hover:text-archive-olive transition-fast"
              aria-label="Search archive"
            >
              <Search size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;