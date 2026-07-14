import React, { useState } from 'react';
import axios from 'axios';
import ArchiveViewer from '@/components/ArchiveViewer';
import { ARCHIVE } from '@/constants/testIds';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExplorePage = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = [
    'Architecture',
    'Objects',
    'People',
    'Materials',
    'Memory',
    'Themes',
    'Collections',
    'Places'
  ];
  
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    
    try {
      const response = await axios.get(`${API}/explore`, {
        params: { category }
      });
      setObjects(response.data.objects || []);
    } catch (error) {
      console.error('Error exploring:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-24">
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            Explore
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl">
            Browse the archive by themes, materials, architectural elements, and more. Each category reveals different perspectives on the palace spaces.
          </p>
        </div>
        
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`p-8 text-center border transition-smooth ${
                selectedCategory === category
                  ? 'border-archive-gold bg-archive-gold text-white'
                  : 'border-archive-secondary hover:border-archive-text/30 text-archive-text'
              }`}
            >
              <p className="text-lg font-serif">{category}</p>
            </button>
          ))}
        </div>
        
        {isLoading && (
          <div className="text-center py-24">
            <p className="text-base text-archive-text/60">Loading...</p>
          </div>
        )}
        
        {/* Results */}
        {!isLoading && selectedCategory && (
          <div className="space-y-12">
            <h2 className="text-3xl font-serif text-archive-text">
              {selectedCategory}
            </h2>
            
            {objects.length > 0 ? (
              <div className="archive-grid">
                {objects.map((object) => (
                  <button
                    key={object.id}
                    onClick={() => setSelectedObject(object)}
                    data-testid={ARCHIVE.objectCard}
                    className="archival-drawer bg-transparent group text-left"
                  >
                    <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary">
                      <img
                        src={object.image_url}
                        alt={object.title}
                        className="archive-image w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                        {object.archive_id}
                      </p>
                      <h3 className="text-xl font-serif text-archive-text">
                        {object.title}
                      </h3>
                      <p className="text-sm text-archive-text/60 font-mono">
                        {object.date}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 space-y-6">
                <p className="text-base text-archive-text/60">
                  No objects found in this category.
                </p>
                <p className="text-sm text-archive-text/40">
                  Try exploring other categories.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {selectedObject && (
        <ArchiveViewer
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
};

export default ExplorePage;