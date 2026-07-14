import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { VOICES } from '@/constants/testIds';

const AudioPlayer = ({ audioUrl, testId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);
  
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []); // audioRef and setCurrentTime are stable
  
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setHasError(false);
    }
  }, []); // audioRef, setDuration, setHasError are stable
  
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []); // setIsPlaying is stable
  
  const handleError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []); // setState functions are stable
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
    // audioRef.current is intentionally not in deps - we use const audio = audioRef.current
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded, handleError]);
  
  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setHasError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (e) => {
    if (!audioRef.current || hasError) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const formatTime = (time) => {
    if (!isFinite(time) || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  if (hasError) {
    return (
      <div className="text-sm text-archive-text/50 py-4 italic">
        Audio player unavailable in this browser
      </div>
    );
  }
  
  return (
    <div className="space-y-4" data-testid={testId || VOICES.audioPlayer}>
      <audio 
        ref={audioRef}
        src={audioUrl}
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
