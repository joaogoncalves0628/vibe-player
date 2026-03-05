import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Song, Album, getYoutubeMusicUrl } from "@/data/music";

interface PlayerState {
  currentSong: Song | null;
  currentAlbum: Album | null;
  isPlaying: boolean;
  likedSongIds: Set<string>;
  activeGradient: [string, string];
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song, album: Album) => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
  setActiveGradient: (colors: [string, string]) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>(() => {
    const saved = localStorage.getItem("liked-songs");
    const likedSongIds = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
    return {
      currentSong: null,
      currentAlbum: null,
      isPlaying: false,
      likedSongIds,
      activeGradient: ["hsl(340, 82%, 52%)", "hsl(280, 70%, 55%)"],
    };
  });

  useEffect(() => {
    localStorage.setItem("liked-songs", JSON.stringify([...state.likedSongIds]));
  }, [state.likedSongIds]);

  const playSong = useCallback((song: Song, album: Album) => {
    setState((s) => ({
      ...s,
      currentSong: song,
      currentAlbum: album,
      isPlaying: true,
      activeGradient: album.colors,
    }));
    window.open(getYoutubeMusicUrl(song), "_blank");
  }, []);

  const toggleLike = useCallback((songId: string) => {
    setState((s) => {
      const next = new Set(s.likedSongIds);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return { ...s, likedSongIds: next };
    });
  }, []);

  const isLiked = useCallback((songId: string) => state.likedSongIds.has(songId), [state.likedSongIds]);

  const setActiveGradient = useCallback((colors: [string, string]) => {
    setState((s) => ({ ...s, activeGradient: colors }));
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, playSong, toggleLike, isLiked, setActiveGradient }}>
      {children}
    </PlayerContext.Provider>
  );
}
