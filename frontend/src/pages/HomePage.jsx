import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOME, COLLECTIONS } from '@/constants/testIds';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [featured, setFeatured] = useState(null);
  const [collections, setCollections] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, collectionsRes] = await Promise.all([
          axios.get(`${API}/featured`),
          axios.get(`${API}/collections`)
        ]);
        setFeatured(featuredRes.data);
        setCollections(collectionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        data-testid={HOME.heroSection}
        className="relative h-screen flex items-center justify-center overflow-hidden film-grain"
      >
        <div className="absolute inset-0">
          <img
            src="https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/gqytg1r1_image.png"
            alt="Rajwada Palace View"
            className="w-full h-full object-cover vintage-photo"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 space-y-8 max-w-4xl slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-none" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)' }}>
            Living Heritage
          </h1>
          
          <p className="text-lg md:text-xl tracking-wider opacity-90" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}>
            An Open Digital Archive of Rajwada & Lal Bagh, Indore
          </p>
          
          <p className="text-base md:text-lg tracking-widest opacity-90 handwritten text-xl" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}>
            Architecture • Objects • Memory
          </p>
        </div>
        
        <button
          onClick={scrollToContent}
          data-testid={HOME.scrollIndicator}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-smooth animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>
      
      {/* Introduction */}
      <section data-testid={HOME.introSection} className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-8 text-center aged-edges p-12">
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
            Living Heritage is an open-access digital archive documenting Rajwada and Lal Bagh through architecture, photography, conservation records, and oral histories.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/80 handwritten">
            Rather than presenting a single historical narrative, the archive brings together multiple perspectives to explore how these palace spaces continue to shape the cultural life of Indore.
          </p>
        </div>
      </section>
      
      {/* Collections */}
      <section data-testid={HOME.collectionsSection} className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-archive-text mb-16 text-center">
          Collections
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <Link
            to="/collections/rajwada"
            data-testid={COLLECTIONS.rajwadaCard}
            className="archival-drawer bg-white group"
          >
            <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <img
                src="https://images.unsplash.com/photo-1596901224267-67ca38199090"
                alt="Rajwada Collection"
                className="archive-image w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp">
                Series I
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Rajwada</h3>
              <p className="text-sm text-archive-text/70 leading-relaxed handwritten">
                Architecture • Public Space • Objects • Interpretation
              </p>
            </div>
          </Link>
          
          <Link
            to="/collections/lal-bagh"
            data-testid={COLLECTIONS.lalBaghCard}
            className="archival-drawer bg-white group"
          >
            <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <img
                src="https://images.unsplash.com/photo-1780245996835-90c0ac8bf4dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHx2aW50YWdlJTIwaGlzdG9yaWNhbCUyMG9iamVjdHN8ZW58MHx8fHwxNzg0MDExMzExfDA&ixlib=rb-4.1.0&q=85"
                alt="Lal Bagh Collection"
                className="archive-image w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp">
                Series II
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Lal Bagh</h3>
              <p className="text-sm text-archive-text/70 leading-relaxed handwritten">
                Interiors • Gardens • Conservation • Objects
              </p>
            </div>
          </Link>
          
          <Link
            to="/voices"
            data-testid={COLLECTIONS.voicesCard}
            className="archival-drawer bg-white group"
          >
            <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <img
                src="https://images.pexels.com/photos/29679833/pexels-photo-29679833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Voices Collection"
                className="archive-image w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp">
                Series III
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Voices</h3>
              <p className="text-sm text-archive-text/70 leading-relaxed handwritten">
                Oral Histories
              </p>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Featured Record */}
      {featured && featured.title && (
        <section data-testid={HOME.featuredRecord} className="max-w-7xl mx-auto px-6 py-24">
          <div className="vintage-frame bg-white p-12">
            <p className="text-xs tracking-widest uppercase text-archive-text/60 mb-8 archive-stamp inline-block">
              Featured Record
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary relative photo-corners">
                <div className="corner-bl"></div>
                <div className="corner-br"></div>
                <img
                  src={featured.image_url}
                  alt={featured.title}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
                  {featured.archive_id}
                </p>
                
                <h3 className="text-3xl md:text-4xl font-serif text-archive-text">
                  {featured.title}
                </h3>
                
                <p className="text-base leading-relaxed text-archive-text/90">
                  {featured.description}
                </p>
                
                <Link
                  to={`/archive/${featured.id}`}
                  className="inline-block px-6 py-3 border border-archive-text text-archive-text hover:bg-archive-secondary transition-smooth text-sm tracking-wider vintage-shadow"
                >
                  View Record
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* About the Archive */}
      <section data-testid={HOME.aboutArchive} className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-8 aged-edges p-12">
          <h2 className="text-3xl md:text-4xl font-serif text-archive-text text-center">
            About the Archive
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
            Living Heritage is an open-access digital archive documenting Rajwada and Lal Bagh through architecture, photographs, conservation records, and oral histories.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/80 handwritten">
            Rather than presenting a single historical narrative, the archive invites visitors to explore the many ways these palace spaces continue to shape the cultural life of Indore.
          </p>
        </div>
      </section>
      
      {/* About the Archivist */}
      <section data-testid={HOME.aboutArchivist} className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="aspect-[3/4] bg-archive-secondary overflow-hidden vintage-frame relative photo-corners">
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/vqocmz3s_Screenshot%202026-03-08%20173227.png"
                alt="Taarina Therese Chandiramani"
                className="w-full h-full object-cover vintage-photo"
              />
            </div>
          </div>
          
          <div className="md:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-archive-text">
              About the Archivist
            </h2>
            
            <p className="text-base leading-relaxed text-archive-text/90">
              Taarina Therese Chandiramani is an artist-researcher currently pursuing an M.A. in English with Digital Humanities. Her work lies at the intersection of museums, archives, oral history, material culture and heritage documentation. Through digital storytelling and archival practices, she explores how digital technologies can make cultural heritage more accessible while preserving the complexity of historical narratives. Living Heritage reflects her ongoing commitment to documenting built heritage through open-access digital archives that encourage public engagement and new ways of experiencing the cultural landscapes of Indore.
            </p>
            
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-archive-text/60">Research Interests</p>
              <div className="flex flex-wrap gap-2">
                {['Digital Humanities', 'Museums', 'Archives', 'Material Culture', 'Oral History', 'Heritage Documentation', 'Public History', 'Digital Storytelling'].map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-archive-secondary text-xs tracking-wider text-archive-text/80 aged-edges"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;