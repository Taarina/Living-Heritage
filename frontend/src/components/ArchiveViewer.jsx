import React from 'react';
import { X } from 'lucide-react';
import { ARCHIVE } from '@/constants/testIds';

const ArchiveViewer = ({ object, onClose }) => {
  if (!object) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 fade-in" onClick={onClose}>
      <div
        className="absolute inset-0 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-screen flex items-start justify-center p-6 pt-24">
          <div className="relative bg-archive-paper max-w-7xl w-full">
            <button
              onClick={onClose}
              data-testid={ARCHIVE.closeViewer}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-archive-text/20 hover:bg-archive-secondary transition-smooth"
            >
              <X size={20} className="text-archive-text" />
            </button>
            
            <div className="grid md:grid-cols-12 gap-12 p-12">
              <div className="md:col-span-8 space-y-6" data-testid={ARCHIVE.objectViewer}>
                <img
                  src={object.image_url}
                  alt={object.title}
                  data-testid={ARCHIVE.objectImage}
                  className="w-full h-auto object-contain"
                />
              </div>
              
              <div className="md:col-span-4 space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-mono tracking-widest uppercase text-archive-olive" data-testid={ARCHIVE.objectId}>
                    {object.archive_id}
                  </p>
                  
                  <h2 className="text-4xl font-serif text-archive-text" data-testid={ARCHIVE.objectTitle}>
                    {object.title}
                  </h2>
                </div>
                
                <div className="space-y-6 text-base leading-relaxed text-archive-text/90">
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Collection</p>
                    <p>{object.collection}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Creator</p>
                    <p>{object.creator}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Date</p>
                    <p className="font-mono text-sm">{object.date}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Description</p>
                    <p className="leading-relaxed">{object.description}</p>
                  </div>
                  
                  {object.keywords && object.keywords.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs tracking-widest uppercase text-archive-text/60">Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {object.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 border border-archive-secondary text-xs tracking-wider text-archive-text/80"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {object.metadata && Object.keys(object.metadata).length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs tracking-widest uppercase text-archive-text/60">Metadata</p>
                      <div className="space-y-1 font-mono text-sm">
                        {Object.entries(object.metadata).map(([key, value]) => (
                          <p key={key} className="text-archive-text/70">
                            {key}: {value}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveViewer;