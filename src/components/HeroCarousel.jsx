// src/components/HeroCarousel.jsx
import React from 'react';
import SongCard from './SongCard';
import '../styles/hero.css';

const HeroCarousel = ({ songs, currentSong, currentIndex, onSelectSong }) => {
  const displayedSongs = songs.slice(0, 5);
  
  const getOffset = (idx) => {
    let diff = idx - currentIndex;
    if (diff < -2) return -2;
    if (diff > 2) return 2;
    return diff;
  };

  return (
    <div className="hero-section">
      <div className="now-playing-info">
        <div className="now-playing-label">NOW PLAYING</div>
        <div className="now-playing-artist">{currentSong?.artist}</div>
        <div className="now-playing-title">{currentSong?.title}</div>
      </div>
      <div className="carousel-container">
        {displayedSongs.map((song, idx) => (
          <SongCard
            key={song.id}
            song={song}
            isActive={idx === currentIndex}
            onClick={() => onSelectSong(idx)}
            offset={getOffset(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;