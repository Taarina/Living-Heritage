import React, { useEffect, useState } from 'react';
import { loadArchiveData, getFeaturedObject } from '@/utils/archiveData';
import { HOME } from '@/constants/testIds';
import HeroSection from '@/components/HeroSection';
import FeaturedObject from '@/components/FeaturedObject';
import CollectionsGrid from '@/components/CollectionsGrid';

const HomePage = () => {
  const [featured, setFeatured] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load archive data once on mount - imported functions are stable
    loadArchiveData().then(() => {
      setFeatured(getFeaturedObject());
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const scrollToContent = () => {
    const vh = window.innerHeight;
    window.scrollTo({ top: vh, behavior: 'smooth' });
  };
  
  if (!isLoaded) {
    return null; // Fast initial render
  }
  
  return (
    <div className="min-h-screen" data-testid={HOME.heroSection}>
      <HeroSection onScrollToContent={scrollToContent} />
      <FeaturedObject object={featured} />
      <CollectionsGrid />
    </div>
  );
};

export default HomePage;
