import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Clock } from "lucide-react";
import { albums } from "@/data/music";
import { SongList } from "@/components/SongList";
import { usePlayer } from "@/contexts/PlayerContext";
import { useEffect } from "react";

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setActiveGradient } = usePlayer();
  const album = albums.find((a) => a.id === id);

  useEffect(() => {
    if (album) setActiveGradient(album.colors);
  }, [album, setActiveGradient]);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Álbum não encontrado</p>
      </div>
    );
  }

  const totalDuration = album.songs.reduce((acc, s) => {
    const [m, sec] = s.duration.split(":").map(Number);
    return acc + m * 60 + sec;
  }, 0);
  const mins = Math.floor(totalDuration / 60);

  return (
    <div
      className="min-h-screen pb-24 transition-all duration-700"
      style={{
        background: `linear-gradient(180deg, ${album.colors[0]}30 0%, ${album.colors[1]}10 30%, hsl(240, 6%, 7%) 60%)`,
      }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 max-w-screen-xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </motion.button>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
            style={{
              boxShadow: `0 20px 60px ${album.colors[0]}44`,
            }}
          >
            {album.coverUrl ? (
              <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${album.colors[0]}, ${album.colors[1]})` }}
              >
                <span className="text-6xl font-display font-bold text-primary-foreground/50">
                  {album.title.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 pt-2"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Álbum</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-1 mb-2">
              {album.title}
            </h1>
            <p className="text-muted-foreground mb-4">
              {album.artist} · {album.year} · {album.songs.length} música{album.songs.length !== 1 ? "s" : ""}, {mins} min
            </p>

            {album.songs.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold shadow-lg"
                style={{ boxShadow: `0 8px 30px ${album.colors[0]}44` }}
              >
                <Play className="w-5 h-5 fill-current" />
                Reproduzir
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Song list */}
        {album.songs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-2"
          >
            <SongList songs={album.songs} album={album} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">Nenhuma música adicionada ainda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
