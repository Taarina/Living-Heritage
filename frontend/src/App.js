import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CollectionsPage from '@/pages/CollectionsPage';
import CollectionDetailPage from '@/pages/CollectionDetailPage';
import VoicesPage from '@/pages/VoicesPage';
import SearchPage from '@/pages/SearchPage';
import ExplorePage from '@/pages/ExplorePage';
import AboutPage from '@/pages/AboutPage';
import '@/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-archive-paper">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="/voices" element={<VoicesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;