import React from 'react';
import './Song.css'; // Optional: use if you want to style it with a CSS file

const Song = ({ id, title, artist, imagePath, isPlaying, onSongClick }) => {
    return (
        <div
            className={`song-item ${isPlaying ? 'playing' : ''}`}
onClick = { onSongClick }
    >
      <img src={imagePath} alt={`${title} thumbnail`} className="thumbnail" />
      <div class= "song-info">
        <p class="song-title">{title}</p>
        <p class="song-artist">{artist}</p>
        <p class="song-status">{isPlaying ? '▶️ Now Playing ' : 'Tap to Play'}</p>
      </div>
    </div >
  );
};

export default Song;