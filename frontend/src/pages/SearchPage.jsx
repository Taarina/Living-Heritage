import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadArchiveData, searchArchive } from '@/utils/archiveData';
import { SEARCH, ARCHIVE } from '@/constants/testIds';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load archive data once on mount - imported functions are stable
    loadArchiveData().then(() => setIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const searchResults = searchArchive(query);
    setResults(searchResults);
  };
  
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Instant search
    if (newQuery.trim()) {
      setResults(searchArchive(newQuery));
    } else {
      setResults([]);
    }
  };
  
  const objects = results.filter(r => r.type === 'object');
  const voices = results.filter(r => r.type === 'voice');
  const totalResults = results.length;
  
  if (!isLoaded) {
    return null;
  }
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            Search the Archive
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative vintage-frame">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                data-testid={SEARCH.searchInput}
                placeholder="Search objects, collections, voices, metadata..."
                className="w-full px-6 py-4 border border-archive-secondary bg-white focus:border-archive-olive focus:outline-none text-base text-archive-text placeholder:text-archive-text/40"
                autoComplete="off"
              />
              <button
                type="submit"
                data-testid={SEARCH.searchButton}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-archive-text hover:text-archive-olive transition-fast"
                aria-label="Search"
              >
                <SearchIcon size={20} />
              </button>
            </div>
          </form>
          
          {/* Results */}
          {query && (
            <div data-testid={SEARCH.searchResults} className="space-y-12 pt-12">
              {totalResults > 0 ? (
                <>
                  <p className="text-base text-archive-text/70 photo-annotation">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                  </p>
                  
                  {/* Archive Objects */}
                  {objects.length > 0 && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-serif text-archive-text border-b border-archive-secondary pb-3">
                        Archive Objects ({objects.length})
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {objects.map((object) => (
                          <Link
                            key={object.id}
                            to={`/archive/${object.id}`}
                            data-testid={ARCHIVE.objectCard}
                            className="polaroid group"
                          >
                            <div className="archive-image-container aspect-[4/3] overflow-hidden bg-archive-secondary relative">
                              <img
                                src={object.image_url}
                                alt={object.title}
                                loading="lazy"
                                className="archive-image w-full h-full object-cover"
                              />
                              <div className="date-stamp">
                                {object.date}
                              </div>
                            </div>
                            <div className="p-6 space-y-3">
                              <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                                {object.archive_id}
                              </p>
                              <h3 className="text-xl font-serif text-archive-text">
                                {object.title}
                              </h3>
                            </div>
                            <div className="polaroid-caption">
                              {object.collection}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Voice Records */}
                  {voices.length > 0 && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-serif text-archive-text border-b border-archive-secondary pb-3">
                        Voices ({voices.length})
                      </h2>
                      
                      <div className="space-y-6">
                        {voices.map((voice) => (
                          <Link
                            key={voice.id}
                            to="/voices"
                            className="block border border-archive-secondary p-6 hover:border-archive-text/30 transition-fast vintage-shadow bg-white"
                          >
                            <div className="flex gap-6">
                              <div className="w-20 h-20 bg-archive-secondary overflow-hidden flex-shrink-0 photo-corners relative">
                                <img
                                  src={voice.portrait_url}
                                  alt={voice.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover vintage-photo"
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
                                  {voice.archive_id}
                                </p>
                                <h3 className="text-xl font-serif text-archive-text">
                                  {voice.name}
                                </h3>
                                <p className="text-sm text-archive-text/70 handwritten">
                                  {voice.role}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24 space-y-6 aged-edges p-12">
                  <p className="text-base text-archive-text/60">
                    No results found for "{query}"
                  </p>
                  <p className="text-sm text-archive-text/40 handwritten">
                    Try different keywords or browse our collections.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
