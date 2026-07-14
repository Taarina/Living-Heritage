import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArchiveViewer from '@/components/ArchiveViewer';
import { ARCHIVE } from '@/constants/testIds';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CollectionDetailPage = () => {
  const { slug } = useParams();
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Determine collection details
  let collectionName;
  let series;
  
  if (slug === 'rajwada') {
    collectionName = 'Rajwada';
    series = 'Series I';
  } else if (slug === 'lal-bagh') {
    collectionName = 'Lal Bagh';
    series = 'Series II';
  } else {
    collectionName = slug;
    series = '';
  }
  
  const fetchObjects = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/archive-objects`, {
        params: { collection: collectionName }
      });
      setObjects(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(obj => obj.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error fetching objects:', error);
      }
    }
  }, [API, collectionName]);
  
  useEffect(() => {
    fetchObjects();
  }, [fetchObjects]);
  
  const filteredObjects = selectedCategory === 'all'
    ? objects
    : objects.filter(obj => obj.category === selectedCategory);
  
  return (
    <div className="min-h-screen pt-32 pb-24 page-content">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-8 mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
            {series}
          </p>
          
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            {collectionName}
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl">
            {slug === 'rajwada'
              ? 'Architectural documentation, public spaces, and material culture of Rajwada Palace.'
              : 'Interior spaces, gardens, conservation records, and decorative objects from Lal Bagh Palace.'}
          </p>
          
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm tracking-wider transition-smooth ${
                  selectedCategory === 'all'
                    ? 'bg-archive-olive text-white'
                    : 'border border-archive-text/20 text-archive-text hover:bg-archive-secondary'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm tracking-wider transition-smooth ${
                    selectedCategory === category
                      ? 'bg-archive-olive text-white'
                      : 'border border-archive-text/20 text-archive-text hover:bg-archive-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Archive Objects Grid with Film Strip Border */}
        {filteredObjects.length > 0 ? (
          <div className="film-strip-border">
            <div className="archive-grid">
              {filteredObjects.map((object) => (
                <button
                  key={object.id}
                  onClick={() => setSelectedObject(object)}
                  data-testid={ARCHIVE.objectCard}
                  className="polaroid group text-left"
                  data-caption={object.title}
                >
                  <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary relative">
                    <img
                      src={object.image_url}
                      alt={object.title}
                      loading="lazy"
                      className="archive-image w-full h-full object-cover"
                    />
                    {/* Handwritten date stamp */}
                    <div className="date-stamp">
                      {object.date}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                      {object.archive_id}
                    </p>
                  </div>
                  {/* Polaroid caption */}
                  <div className="polaroid-caption">
                    {object.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 space-y-6">
            <p className="text-base text-archive-text/60">
              No objects in this collection yet.
            </p>
            <p className="text-sm text-archive-text/40 handwritten">
              Archive records will be added soon.
            </p>
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

export default CollectionDetailPage;