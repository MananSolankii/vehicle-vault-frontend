import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showSlider, setShowSlider] = useState(false);
  const [track, setTrack] = useState("/bg-music.mp3");
  const prevVolume = useRef(volume);

  // Auto-play on first click
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      document.removeEventListener("click", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  // Play new track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track;
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [track]);

  // Auto-hide when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSlider(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
    setShowSlider(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = prevVolume.current;
      setVolume(prevVolume.current);
      setIsMuted(false);
    } else {
      prevVolume.current = volume;
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
    setShowSlider(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setShowSlider(true);
  };

  return (
    <div ref={wrapperRef} style={containerStyle}>
      <audio ref={audioRef} loop>
        <source src={track} type="audio/mpeg" />
      </audio>

      <button onClick={togglePlayPause} style={iconStyle} title="Play/Pause">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button onClick={toggleMute} style={iconStyle} title="Mute/Unmute">
        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        style={{
          width: showSlider ? "100px" : "0px",
          opacity: showSlider ? 1 : 0,
          transition: "width 0.3s ease, opacity 0.3s ease",
        }}
      />

      <select
        onChange={(e) => setTrack(e.target.value)}
        value={track}
        style={{
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          fontSize: "14px",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)"
        }}
      >
        <option value="/bg-music.mp3">Danza Kuduro</option>
        <option value="/bg-chill.mp3">Chill</option>
        <option value="/bg-energetic.mp3">Energetic</option>
        <option value="/bg-ambient.mp3">Ambient</option>
        <option value="/six-days.mp3">six days</option>
      </select>
    </div>
  );
};

const containerStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderRadius: "30px",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  transition: "all 0.3s ease"
};

const iconStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "20px",
  cursor: "pointer"
};

export default BackgroundMusic;
