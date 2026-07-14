import React from 'react';
import { Link } from 'react-router-dom';

const CollectionsGrid = () => {
  const collections = [
    {
      slug: 'rajwada',
      name: 'Rajwada',
      series: 'Series I',
      description: 'The heart of Indore—a seven-storey palace built in 1747 by Malhar Rao Holkar. Rajwada showcases Maratha architecture with European influences, featuring intricate wooden carvings and a façade that has witnessed centuries of history.',
      count: 9,
      image: 'https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/p07kwv9m_Screenshot%202026-07-13%20201051.png'
    },
    {
      slug: 'lal-bagh',
      name: 'Lal Bagh',
      series: 'Series II',
      description: 'A stunning example of European architectural influence in India. Built in 1921, this palace features Italian marble, ornate ballrooms, and sprawling gardens. Once home to the Holkar dynasty, it now stands as a testament to royal grandeur.',
      count: 19,
      image: 'https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/kseniwc5_Screenshot%202026-07-14%20133006.png'
    }
  ];
  
  return (
    <section className="py-24 bg-archive-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-archive-text">
            Collections
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl">
            Explore our curated collections of architectural photography, historical artifacts, 
            and oral histories documenting the rich heritage of Indore's royal palaces.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              to={`/collections/${collection.slug}`}
              className="archival-drawer group"
            >
              <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary">
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="eager"
                  crossOrigin="anonymous"
                  className="archive-image w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-full bg-archive-secondary text-archive-text/50"><span>${collection.name}</span></div>`;
                  }}
                />
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                      {collection.series}
                    </p>
                    <h3 className="text-3xl font-serif text-archive-text">
                      {collection.name}
                    </h3>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-serif text-archive-gold">
                      {collection.count}
                    </p>
                    <p className="text-xs tracking-widest uppercase text-archive-text/50">
                      Objects
                    </p>
                  </div>
                </div>
                
                <p className="text-base text-archive-text/80 leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
