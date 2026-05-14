// src/components/PlayerBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/player.css';

const PlayerBar = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev, progress, duration, onSeek, volume, onVolumeChange, onShuffle, onRepeat, repeatMode }) => {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    onSeek(percent * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const vol = Math.min(1, Math.max(0, x / rect.width));
    onVolumeChange(vol);
  };

  return (
    <div className="player-bar">
      <div className="player-left">
        <img src={currentSong?.cover} alt="cover" className="now-playing-thumb" />
        <div className="track-info">
          <h5>{currentSong?.title}</h5>
          <p>{currentSong?.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="controls">
          <button className="control-btn" onClick={onShuffle}>🔀</button>
          <button className="control-btn" onClick={onPrev}>⏮</button>
          <button className="control-btn play-pause" onClick={onPlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn" onClick={onNext}>⏭</button>
          <button className="control-btn" onClick={onRepeat}>{repeatMode === 1 ? '🔁' : repeatMode === 2 ? '🔂' : '🔄'}</button>
        </div>
        <div className="progress-area">
          <span>{formatTime(progress)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress-fill" style={{ width: `${(progress / duration) * 100 || 0}%` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-control">
          <span className="control-btn">🔊</span>
          <div className="volume-slider" onClick={handleVolumeClick}>
            <div className="volume-fill" style={{ width: `${volume * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;