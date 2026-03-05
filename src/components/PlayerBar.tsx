import { motion, AnimatePresence } from "framer-motion";
import { Heart, Play, ExternalLink } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { getYoutubeMusicUrl } from "@/data/music";

export function PlayerBar() {
  const { currentSong, currentAlbum, isLiked, toggleLike, activeGradient } = usePlayer();

  return (
    <AnimatePresence>
      {currentSong && currentAlbum && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass-strong"
          style={{
            borderTop: `1px solid ${activeGradient[0]}33`,
            boxShadow: `0 -8px 40px ${activeGradient[0]}22`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${activeGradient[0]}44, ${activeGradient[1]}22, transparent)`,
            }}
          />

          <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 max-w-screen-xl mx-auto">
            {/* Song info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {currentAlbum.coverUrl && (
                <motion.img
                  key={currentSong.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={currentAlbum.coverUrl}
                  alt={currentAlbum.title}
                  className="w-12 h-12 rounded-md object-cover shadow-lg"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{currentSong.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleLike(currentSong.id)}
                className="p-2 rounded-full transition-colors hover:bg-secondary"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isLiked(currentSong.id) ? "fill-liked text-liked animate-like-pop" : "text-muted-foreground"
                  }`}
                />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={getYoutubeMusicUrl(currentSong)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-medium"
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">YouTube Music</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
