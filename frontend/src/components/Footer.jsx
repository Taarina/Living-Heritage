import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-archive-secondary bg-archive-paper mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-serif text-archive-text">Living Heritage</h3>
          <p className="text-base text-archive-text/80 max-w-2xl mx-auto">
            An Open Digital Archive of Rajwada & Lal Bagh, Indore
          </p>
          
          <div className="pt-6 space-y-2">
            <p className="text-sm tracking-widest uppercase text-archive-text/60">
              Curated by
            </p>
            <p className="text-base text-archive-text">
              Taarina Therese Chandiramani
            </p>
          </div>
          
          <div className="pt-6 flex items-center justify-center gap-4 text-sm text-archive-text/60">
            <span className="tracking-widest uppercase">Open Access</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;