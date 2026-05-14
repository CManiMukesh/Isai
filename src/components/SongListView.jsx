import React from 'react';
import '../styles/songlist.css';

const SongListView = ({ songs, currentIndex, onSelectSong }) => {
  return (
    <div className="song-list-view">
      <div className="song-list-container">
        {songs.map((song, idx) => (
          <div
            key={song.id}
            className={`song-list-item ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => onSelectSong(idx)}
          >
            <img src={song.cover} alt={song.title} className="list-item-cover" />
            <div className="list-item-info">
              <h4 className="list-item-title">{song.title}</h4>
              <p className="list-item-artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongListView;
