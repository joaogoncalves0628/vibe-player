import { motion } from "framer-motion";
import { Heart, Play, Clock } from "lucide-react";
import { Song, Album } from "@/data/music";
import { usePlayer } from "@/contexts/PlayerContext";

interface SongListProps {
  songs: Song[];
  album: Album;
}

export function SongList({ songs, album }: SongListProps) {
  const { playSong, toggleLike, isLiked, currentSong } = usePlayer();

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-[32px_1fr_auto_40px] gap-3 px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider border-b border-border/50">
        <span>#</span>
        <span>Título</span>
        <Clock className="w-3.5 h-3.5" />
        <span />
      </div>

      {songs.map((song, i) => {
        const active = currentSong?.id === song.id;
        const liked = isLiked(song.id);

        return (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`group grid grid-cols-[32px_1fr_auto_40px] gap-3 px-4 py-2.5 rounded-lg transition-all cursor-pointer
              ${active ? "bg-primary/10" : "hover:bg-secondary/60"}`}
            onClick={() => playSong(song, album)}
          >
            {/* Track number / play icon */}
            <div className="flex items-center justify-center">
              <span className={`text-sm group-hover:hidden ${active ? "text-primary font-bold" : "text-muted-foreground"}`}>
                {song.trackNumber}
              </span>
              <Play className="w-4 h-4 text-foreground hidden group-hover:block fill-current" />
            </div>

            {/* Title & artist */}
            <div className="min-w-0">
              <p className={`text-sm font-medium truncate ${active ? "text-primary" : "text-foreground"}`}>
                {song.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>

            {/* Duration */}
            <span className="text-xs text-muted-foreground self-center">{song.duration}</span>

            {/* Like */}
            <motion.button
              whileTap={{ scale: 0.7 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(song.id);
              }}
              className="self-center p-1 rounded-full"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  liked ? "fill-liked text-liked animate-like-pop" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                }`}
              />
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}
