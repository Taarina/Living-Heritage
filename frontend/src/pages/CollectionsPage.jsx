import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadArchiveData, getCollections } from '@/utils/archiveData';
import { COLLECTIONS } from '@/constants/testIds';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load archive data once on mount - imported functions are stable
    loadArchiveData().then(() => {
      setCollections(getCollections());
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const collectionImages = {
    'Rajwada': 'https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/p07kwv9m_Screenshot%202026-07-13%20201051.png',
    'Lal Bagh': 'https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/kseniwc5_Screenshot%202026-07-14%20133006.png',
    'Voices': 'https://images.pexels.com/photos/29679833/pexels-photo-29679833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  };
  
  const testIds = [COLLECTIONS.rajwadaCard, COLLECTIONS.lalBaghCard, COLLECTIONS.voicesCard];
  
  if (!isLoaded) {
    return null;
  }
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-24">
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            Collections
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl photo-annotation">
            The archive is organized into three series, each exploring different aspects of Rajwada and Lal Bagh Palace through photography, documentation, and oral histories.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {collections.length > 0 ? (
            collections.map((collection, idx) => {
              const slug = collection.name.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <Link
                  key={collection.id}
                  to={collection.name === 'Voices' ? '/voices' : `/collections/${slug}`}
                  data-testid={testIds[idx]}
                  className="archival-drawer bg-white group polaroid"
                  data-caption={`${collection.name} - ${collection.categories[0]}`}
                >
                  <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
                    <div className="corner-bl"></div>
                    <div className="corner-br"></div>
                    <img
                      src={collectionImages[collection.name] || collectionImages['Rajwada']}
                      alt={`${collection.name} Collection`}
                      loading="lazy"
                      className="archive-image w-full h-full object-cover"
                    />
                    <div className="date-stamp">
                      Est. 2026
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
                      {collection.series}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif text-archive-text">
                      {collection.name}
                    </h3>
                  </div>
                  <div className="polaroid-caption">
                    {collection.categories.join(' • ')}
                  </div>
                </Link>
              );
            })
          ) : (
            // Default collections if none exist in DB
            <>
              <Link
                to="/collections/rajwada"
                data-testid={COLLECTIONS.rajwadaCard}
                className="archival-drawer bg-white group polaroid"
                data-caption="Rajwada - Architecture"
              >
                <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  <img
                    src="https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/p07kwv9m_Screenshot%202026-07-13%20201051.png"
                    alt="Rajwada Collection"
                    loading="lazy"
                    className="archive-image w-full h-full object-cover"
                  />
                  <div className="date-stamp">Est. 2026</div>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">Series I</p>
                  <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Rajwada</h3>
                </div>
                <div className="polaroid-caption">
                  Architecture • Public Space • Objects
                </div>
              </Link>
              
              <Link
                to="/collections/lal-bagh"
                data-testid={COLLECTIONS.lalBaghCard}
                className="archival-drawer bg-white group polaroid"
                data-caption="Lal Bagh - Interiors"
              >
                <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  <img
                    src="https://images.unsplash.com/photo-1780245996835-90c0ac8bf4dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHx2aW50YWdlJTIwaGlzdG9yaWNhbCUyMG9iamVjdHN8ZW58MHx8fHwxNzg0MDExMzExfDA&ixlib=rb-4.1.0&q=85"
                    alt="Lal Bagh Collection"
                    loading="lazy"
                    className="archive-image w-full h-full object-cover"
                  />
                  <div className="date-stamp">Est. 2026</div>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">Series II</p>
                  <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Lal Bagh</h3>
                </div>
                <div className="polaroid-caption">
                  Interiors • Gardens • Conservation
                </div>
              </Link>
              
              <Link
                to="/voices"
                data-testid={COLLECTIONS.voicesCard}
                className="archival-drawer bg-white group polaroid"
                data-caption="Voices - Oral Histories"
              >
                <div className="archive-image-container aspect-[3/4] overflow-hidden bg-archive-secondary relative photo-corners">
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  <img
                    src="https://images.pexels.com/photos/29679833/pexels-photo-29679833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Voices Collection"
                    loading="lazy"
                    className="archive-image w-full h-full object-cover"
                  />
                  <div className="date-stamp">Est. 2026</div>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">Series III</p>
                  <h3 className="text-2xl md:text-3xl font-serif text-archive-text">Voices</h3>
                </div>
                <div className="polaroid-caption">
                  Oral Histories
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;