// Static archive data loader
// Loads JSON once and caches in memory for instant access

let archiveCache = null;

export const loadArchiveData = async () => {
  if (archiveCache) {
    return archiveCache;
  }
  
  try {
    const response = await fetch('/data/archive.json');
    archiveCache = await response.json();
    return archiveCache;
  } catch (error) {
    console.error('Failed to load archive data:', error);
    return {
      collections: [],
      archive_objects: [],
      voices: [],
      metadata: {}
    };
  }
};

export const getCollections = () => {
  return archiveCache?.collections || [];
};

export const getCollectionBySlug = (slug) => {
  if (!archiveCache) return null;
  
  const nameMap = {
    'rajwada': 'Rajwada',
    'lal-bagh': 'Lal Bagh',
    'voices': 'Voices'
  };
  
  const collectionName = nameMap[slug] || slug;
  return archiveCache.collections.find(c => c.name === collectionName);
};

export const getArchiveObjects = (collectionName = null) => {
  if (!archiveCache) return [];
  
  if (!collectionName) {
    return archiveCache.archive_objects;
  }
  
  return archiveCache.archive_objects.filter(
    obj => obj.collection === collectionName
  );
};

export const getVoices = () => {
  return archiveCache?.voices || [];
};

export const getFeaturedObject = () => {
  // Return first Rajwada object as featured
  return archiveCache?.archive_objects?.[0] || null;
};

export const searchArchive = (query) => {
  if (!archiveCache || !query) return [];
  
  const searchTerm = query.toLowerCase();
  const results = [];
  
  // Search archive objects
  archiveCache.archive_objects.forEach(obj => {
    if (
      obj.title?.toLowerCase().includes(searchTerm) ||
      obj.description?.toLowerCase().includes(searchTerm) ||
      obj.keywords?.some(k => k.toLowerCase().includes(searchTerm)) ||
      obj.archive_id?.toLowerCase().includes(searchTerm)
    ) {
      results.push({ type: 'object', ...obj });
    }
  });
  
  // Search voices
  archiveCache.voices.forEach(voice => {
    if (
      voice.name?.toLowerCase().includes(searchTerm) ||
      voice.role?.toLowerCase().includes(searchTerm) ||
      voice.biography?.toLowerCase().includes(searchTerm)
    ) {
      results.push({ type: 'voice', ...voice });
    }
  });
  
  return results;
};
