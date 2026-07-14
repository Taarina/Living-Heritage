import React, { useEffect, useState } from 'react';
import { loadArchiveData, getVoices } from '@/utils/archiveData';
import AudioPlayer from '@/components/AudioPlayer';
import TranscriptModal from '@/components/TranscriptModal';
import { VOICES } from '@/constants/testIds';

const VoicesPage = () => {
  const [voices, setVoices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load archive data once on mount - imported functions are stable
    loadArchiveData().then(() => {
      const allVoices = getVoices();
      
      // Group Harishchand Mishra's recordings together
      const harishchandVoices = allVoices.filter(v => v.name === 'Harishchand Mishra');
      const otherVoices = allVoices.filter(v => v.name !== 'Harishchand Mishra');
      
      // Merge: show Harishchand first with all his recordings, then others
      const organizedVoices = [...harishchandVoices, ...otherVoices];
      setVoices(organizedVoices);
      setIsLoaded(true);
    });
    // loadArchiveData, getVoices, setVoices, setIsLoaded are all stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!isLoaded) {
    return null;
  }
  
  // Group voices by person
  const voicesByPerson = {};
  voices.forEach(voice => {
    if (!voicesByPerson[voice.name]) {
      voicesByPerson[voice.name] = [];
    }
    voicesByPerson[voice.name].push(voice);
  });
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-24">
          <div className="space-y-6">
            <p className="text-xs font-mono tracking-widest uppercase text-archive-olive">
              SERIES III
            </p>
            <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
              Voices
            </h1>
          </div>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl">
            Oral histories from caretakers, researchers, and community members who have intimate 
            knowledge of Rajwada and Lal Bagh Palace.
          </p>
        </div>
        
        <div className="space-y-16">
          {Object.entries(voicesByPerson).map(([personName, personVoices]) => (
            <div key={personName} className="space-y-8">
              {/* Person Header - show once */}
              <div className="flex gap-8 items-start border-b border-archive-secondary pb-8">
                <div className="w-32 h-32 bg-archive-secondary overflow-hidden flex-shrink-0 photo-corners relative">
                  <img
                    src={personVoices[0].portrait_url}
                    alt={personName}
                    loading="eager"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover vintage-photo"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-3xl font-serif text-archive-text mb-2">
                      {personName}
                    </h2>
                    <p className="text-sm text-archive-text/70 handwritten">
                      {personVoices[0].role}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                      Biography
                    </h3>
                    <p className="text-base text-archive-text/80 leading-relaxed">
                      {personVoices[0].biography}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* All recordings for this person */}
              <div className="space-y-12 pl-0 md:pl-40">
                {personVoices.map((voice, index) => (
                  <div 
                    key={voice.id} 
                    data-testid={VOICES.voiceCard}
                    className="vintage-frame p-8 space-y-6 bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block mb-3">
                          {voice.archive_id}
                        </p>
                        {personVoices.length > 1 && (
                          <h3 className="text-xl font-serif text-archive-text">
                            Recording {index + 1}: {voice.archive_id === 'OH-001' ? 'Lal Bagh Palace History' : 'Ahilyabai Holkar & Rajwada'}
                          </h3>
                        )}
                      </div>
                    </div>
                    
                    {/* Audio Player */}
                    {voice.audio_url && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono tracking-widest uppercase text-archive-olive">
                          Oral History
                        </h4>
                        <AudioPlayer audioUrl={voice.audio_url} />
                      </div>
                    )}
                    
                    {/* Highlighted Quote */}
                    {voice.highlighted_quote && (
                      <blockquote className="border-l-2 border-archive-gold pl-6 italic text-archive-text/80">
                        "{voice.highlighted_quote}"
                      </blockquote>
                    )}
                    
                    {/* Transcript Modal Button */}
                    {voice.transcript && (
                      <div>
                        <TranscriptModal 
                          transcript={voice.transcript}
                          name={voice.name}
                          archiveId={voice.archive_id}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoicesPage;
