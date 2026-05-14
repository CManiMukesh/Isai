// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import songs from './objects/songs';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import SongListView from './components/SongListView';
import PlayerBar from './components/PlayerBar';
import './styles/app.css';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [activeView, setActiveView] = useState('home'); // 'home' or 'search'
  const audioRef = useRef(new Audio());

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentSong.audio;
    audio.load();
    if (isPlaying) {
      audio.play().catch(e => console.log("Auto-play blocked, user interaction needed"));
    }
    
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMeta = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 2) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMeta);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMeta);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, repeatMode]);
  
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleNext = () => {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };
  
  const handlePrev = () => {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };
  
  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };
  
  const handleVolumeChange = (vol) => {
    setVolume(vol);
    audioRef.current.volume = vol;
  };
  
  const handleShuffle = () => {
    let randomIdx = Math.floor(Math.random() * songs.length);
    while (randomIdx === currentSongIndex && songs.length > 1) randomIdx = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIdx);
    setIsPlaying(true);
  };
  
  const handleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };
  
  const selectSong = (index) => {
    if (index === currentSongIndex) return;
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };
  
  return (
    <div 
      className="app"
      style={{
        '--bg-image': `url(${currentSong?.cover})`
      }}
    >
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'home' ? (
        <HeroCarousel 
          songs={songs}
          currentSong={currentSong}
          currentIndex={currentSongIndex}
          onSelectSong={selectSong}
        />
      ) : (
        <SongListView
          songs={songs}
          currentIndex={currentSongIndex}
          onSelectSong={selectSong}
        />
      )}
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={progress}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
        repeatMode={repeatMode}
      />
    </div>
  );
}

export default App;