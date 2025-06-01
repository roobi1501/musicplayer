import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { songs } from './songs';
import Song from './components/Song';

const App = () => {
  const [id, setId] = useState("abc@1");
  const [mode, setMode] = useState("pause");
  const audioElement = useRef(null);

  // Creating refs for each song
  const songRefs = useRef({});

  const currentSong = useMemo(() => songs.find(song => song.id === id), [id]);

  const playSong = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.play();
      setMode("play");
    }
  }, []);

  const pauseSong = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.pause();
      setMode("pause");
    }
  }, []);

  const handleSongToggle = useCallback((songId) => {
    if (songId === id) {
      mode === "play" ? pauseSong() : playSong();
    } else {
      setId(songId);
      setMode("play");
    }
  }, [id, mode, playSong, pauseSong]);

  const playNextSong = useCallback(() => {
    const currentIndex = songs.findIndex(song => song.id === id);
    if (currentIndex + 1 < songs.length) {
      setId(songs[currentIndex + 1].id);
      setMode("play");
    }
  }, [id]);

  const playPrevSong = useCallback(() => {
    const currentIndex = songs.findIndex(song => song.id === id);
    if (currentIndex > 0) {
      setId(songs[currentIndex - 1].id);
      setMode("play");
    }
  }, [id]);

  useEffect(() => {
    if (audioElement.current && mode === "play") {
      audioElement.current.play().catch(() => {});
    }

    // Scroll to the currently playing song
    const currentRef = songRefs.current[id];
    if (currentRef && currentRef.scrollIntoView) {
      currentRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [id, mode]);

  return (
    <div className="application">
      <div className='img-plot'>
        {!!currentSong && (
          <div className="song-banner">
            <img src={currentSong.imagePath} alt={currentSong.title} />
          </div>
        )}
        <div className="controls">
          {mode === "pause" && <button onClick={playSong}>Play Song</button>}
          {mode === "play" && <button onClick={pauseSong}>Pause Song</button>}
          <button onClick={playNextSong} disabled={songs.findIndex(song => song.id === id) >= songs.length - 1}>Next Song</button>
          <button onClick={playPrevSong} disabled={songs.findIndex(song => song.id === id) <= 0}>Prev Song</button>
        </div>
      </div>

      <div className='song-plot'>
        <div className='song-count'> Total Songs: {songs.length}</div>
        <div className="songs">
          {songs.map(song => (
            <div
              key={song.id}
              ref={el => (songRefs.current[song.id] = el)} // Assign ref here
            >
              <Song
                {...song}
                isPlaying={id === song.id && mode === "play"}
                onSongClick={() => handleSongToggle(song.id)}
              />
            </div>
          ))}
        </div>

        {!!currentSong && (
          <audio
            ref={audioElement}
            src={currentSong.mp3Path}
            autoPlay
            onEnded={playNextSong}
          />
        )}
      </div>
    </div>
  );
};

export default App;
