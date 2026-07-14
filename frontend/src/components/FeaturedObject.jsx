import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedObject = ({ object }) => {
  if (!object) return null;
  
  return (
    <section className="py-24 bg-archive-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-archive-text">
            Featured Object
          </h2>
        </div>
        
        <Link to={`/collections/${object.collection.toLowerCase().replace(' ', '-')}`}>
          <div className="polaroid mx-auto max-w-3xl">
            <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary relative">
              <img
                src={object.image_url}
                alt={object.title}
                loading="eager"
                crossOrigin="anonymous"
                className="archive-image w-full h-full object-cover"
              />
              <div className="date-stamp">
                {object.date}
              </div>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                {object.archive_id}
              </p>
              <h3 className="text-3xl font-serif text-archive-text">
                {object.title}
              </h3>
              <p className="text-base text-archive-text/80 leading-relaxed">
                {object.description}
              </p>
            </div>
            <div className="polaroid-caption">
              {object.collection}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedObject;
