import { motion } from "framer-motion";
import { Heart, Music } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { albums, getAllSongs } from "@/data/music";
import { SongList } from "@/components/SongList";

const Library = () => {
  const { likedSongIds, activeGradient } = usePlayer();
  const allSongs = getAllSongs(albums);
  const likedSongs = allSongs.filter((s) => likedSongIds.has(s.id));

  // Find album for each liked song
  const getAlbumForSong = (albumId: string) =>
    albums.find((a) => a.id === albumId) || albums[0];

  return (
    <div
      className="min-h-screen pb-24 transition-all duration-700"
      style={{
        background: `linear-gradient(160deg, ${activeGradient[0]}18 0%, ${activeGradient[1]}0a 40%, hsl(240, 6%, 7%) 70%)`,
      }}
    >
      <div className="px-4 sm:px-6 pt-12 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-xl">
            <Heart className="w-7 h-7 text-primary-foreground fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Músicas Curtidas</h1>
            <p className="text-muted-foreground">{likedSongs.length} música{likedSongs.length !== 1 ? "s" : ""}</p>
          </div>
        </motion.div>

        {likedSongs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">
              Curta músicas para vê-las aqui ❤️
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-2"
          >
            <SongList
              songs={likedSongs}
              album={getAlbumForSong(likedSongs[0]?.albumId)}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Library;
