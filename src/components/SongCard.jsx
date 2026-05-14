// src/components/SongCard.jsx
import React from 'react';
import '../styles/card.css';

const SongCard = ({ song, isActive, onClick, offset }) => {
  return (
    <div className={`song-card carousel-card offset-${offset}`} onClick={onClick}>
      <div className="card-inner">
        <img src={song.cover} alt={song.title} className="card-cover" />
        <div className="card-info">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;