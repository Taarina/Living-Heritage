import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SEARCH, ARCHIVE } from '@/constants/testIds';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ objects: [], voices: [] });
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await axios.get(`${API}/search`, {
        params: { q: query }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const totalResults = results.objects.length + results.voices.length;
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            Search the Archive
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid={SEARCH.searchInput}
                placeholder="Search objects, collections, voices, metadata..."
                className="w-full px-6 py-4 border border-archive-secondary bg-archive-secondary focus:border-archive-olive focus:outline-none text-base text-archive-text placeholder:text-archive-text/40"
              />
              <button
                type="submit"
                data-testid={SEARCH.searchButton}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-archive-text hover:text-archive-olive transition-smooth"
              >
                <SearchIcon size={20} />
              </button>
            </div>
            
            {isSearching && (
              <p className="text-sm text-archive-text/60">Searching...</p>
            )}
          </form>
          
          {/* Results */}
          {query && !isSearching && (
            <div data-testid={SEARCH.searchResults} className="space-y-12 pt-12">
              {totalResults > 0 ? (
                <>
                  <p className="text-base text-archive-text/70">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for “{query}”
                  </p>
                  
                  {/* Archive Objects */}
                  {results.objects.length > 0 && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-serif text-archive-text border-b border-archive-secondary pb-3">
                        Archive Objects ({results.objects.length})
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {results.objects.map((object) => (
                          <Link
                            key={object.id}
                            to={`/archive/${object.id}`}
                            data-testid={ARCHIVE.objectCard}
                            className="archival-drawer bg-transparent group"
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
                              <p className="text-sm text-archive-text/70 line-clamp-2">
                                {object.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Voice Records */}
                  {results.voices.length > 0 && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-serif text-archive-text border-b border-archive-secondary pb-3">
                        Voices ({results.voices.length})
                      </h2>
                      
                      <div className="space-y-6">
                        {results.voices.map((voice) => (
                          <Link
                            key={voice.id}
                            to="/voices"
                            className="block border border-archive-secondary p-6 hover:border-archive-text/30 transition-smooth"
                          >
                            <div className="flex gap-6">
                              <div className="w-20 h-20 bg-archive-secondary overflow-hidden flex-shrink-0">
                                <img
                                  src={voice.portrait_url}
                                  alt={voice.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                                  {voice.archive_id}
                                </p>
                                <h3 className="text-xl font-serif text-archive-text">
                                  {voice.name}
                                </h3>
                                <p className="text-sm text-archive-text/70">
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
                <div className="text-center py-24 space-y-6">
                  <p className="text-base text-archive-text/60">
                    No results found for “{query}”
                  </p>
                  <p className="text-sm text-archive-text/40">
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