import React, { useEffect, useState } from 'react';
import { loadArchiveData, getVoices } from '@/utils/archiveData';
import AudioPlayer from '@/components/AudioPlayer';
import { VOICES } from '@/constants/testIds';

const VoicesPage = () => {
  const [voices, setVoices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load archive data once on mount - imported functions are stable
    loadArchiveData().then(() => {
      setVoices(getVoices());
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!isLoaded) {
    return null;
  }
  
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 mb-24">
          <div className="space-y-6">
            <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
              Series III
            </p>
            
            <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
              Voices
            </h1>
          </div>
          
          <p className="text-base md:text-lg leading-relaxed text-archive-text/90 max-w-3xl photo-annotation">
            Oral histories from caretakers, researchers, and community members who have intimate knowledge of Rajwada and Lal Bagh Palace.
          </p>
        </div>
        
        {voices.length > 0 ? (
          <div className="space-y-16">
            {voices.map((voice) => (
              <article
                key={voice.id}
                data-testid={VOICES.voiceCard}
                className="grid md:grid-cols-12 gap-12 border-t border-archive-secondary pt-16"
              >
                <div className="md:col-span-4 space-y-6">
                  <div className="polaroid">
                    <div className="aspect-[3/4] bg-archive-secondary overflow-hidden relative photo-corners">
                      <div className="corner-bl"></div>
                      <div className="corner-br"></div>
                      <img
                        src={voice.portrait_url}
                        alt={voice.name}
                        className="w-full h-full object-cover vintage-photo"
                      />
                      <div className="date-stamp">
                        2026
                      </div>
                    </div>
                    <div className="polaroid-caption">
                      {voice.name}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-xs font-mono tracking-widest uppercase text-archive-olive archive-stamp inline-block">
                      {voice.archive_id}
                    </p>
                    <h2 className="text-3xl font-serif text-archive-text">
                      {voice.name}
                    </h2>
                    <p className="text-base text-archive-text/70 handwritten">
                      {voice.role}
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-8 space-y-8">
                  <div className="space-y-6 aged-edges p-8">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Biography</p>
                    <p className="text-base leading-relaxed text-archive-text/90">
                      {voice.biography}
                    </p>
                  </div>
                  
                  {voice.audio_url && (
                    <div className="space-y-4">
                      <p className="text-xs tracking-widest uppercase text-archive-text/60">Oral History</p>
                      <AudioPlayer audioUrl={voice.audio_url} />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <p className="text-xs tracking-widest uppercase text-archive-text/60">Transcript</p>
                    <div
                      data-testid={VOICES.transcript}
                      className="bg-archive-secondary p-8 text-base leading-relaxed text-archive-text/90 aged-edges"
                    >
                      <p>{voice.transcript}</p>
                    </div>
                  </div>
                  
                  {voice.highlighted_quote && (
                    <div className="border-l-2 border-archive-gold pl-8 py-4 aged-edges">
                      <p className="text-xl font-serif italic text-archive-text leading-relaxed">
                        “{voice.highlighted_quote}”
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-6">
            <p className="text-base text-archive-text/60">
              Oral history recordings are being processed.
            </p>
            <p className="text-sm text-archive-text/40 handwritten">
              Voice records will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoicesPage;