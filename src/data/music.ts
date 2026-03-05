export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: string;
  youtubeUrl: string;
  trackNumber: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  colors: [string, string]; // two dominant colors for gradient
  songs: Song[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl?: string;
  songIds: string[];
}

// Sample data — user will replace with real albums
export const albums: Album[] = [
  {
    id: "sample-1",
    title: "Aguardando seus álbuns",
    artist: "Anexe suas músicas",
    coverUrl: "",
    year: 2024,
    colors: ["hsl(340, 82%, 52%)", "hsl(280, 70%, 55%)"],
    songs: [],
  },
];

export const playlists: Playlist[] = [
  {
    id: "liked",
    name: "Músicas Curtidas",
    description: "Suas músicas favoritas",
    songIds: [],
  },
];

export function getAllSongs(albumList: Album[]): Song[] {
  return albumList.flatMap((a) => a.songs);
}

export function getYoutubeMusicUrl(song: Song): string {
  if (song.youtubeUrl) return song.youtubeUrl;
  const query = encodeURIComponent(`${song.title} ${song.artist}`);
  return `https://music.youtube.com/search?q=${query}`;
}
