import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { VOICES } from '@/constants/testIds';

const AudioPlayer = ({ audioUrl, testId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  
  // Fetch audio and create blob URL with correct MIME type
  useEffect(() => {
    let objectUrl;
    
    const loadAudio = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(audioUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        // Create new blob with correct MIME type
        const correctBlob = new Blob([blob], { type: 'audio/mp4' });
        objectUrl = URL.createObjectURL(correctBlob);
        setBlobUrl(objectUrl);
        setLoading(false);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Audio load error:', err);
        }
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (audioUrl) {
      loadAudio();
    }
    
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [audioUrl]);
  
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);
  
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);
  
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded]);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  if (loading) {
    return (
      <div className="text-sm text-archive-text/50 py-4">
        Loading audio...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-sm text-red-600 py-4">
        Audio unavailable
      </div>
    );
  }
  
  return (
    <div className="space-y-4" data-testid={testId || VOICES.audioPlayer}>
      <audio 
        ref={audioRef}
        src={blobUrl}
        preload="metadata"
      />
      
      <div className="flex items-center gap-6">
        <button
          onClick={togglePlay}
          data-testid={VOICES.playButton}
          className="w-12 h-12 flex items-center justify-center border border-archive-text/20 hover:border-archive-olive hover:bg-archive-secondary transition-fast"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={20} className="text-archive-text" />
          ) : (
            <Play size={20} className="text-archive-text ml-1" />
          )}
        </button>
        
        <div className="flex-1 space-y-2">
          <div 
            onClick={handleSeek}
            className="audio-progress cursor-pointer"
          >
            <div 
              className="audio-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-archive-text/60 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
