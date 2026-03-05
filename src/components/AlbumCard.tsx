import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Album } from "@/data/music";
import { Play } from "lucide-react";

interface AlbumCardProps {
  album: Album;
  index: number;
}

export function AlbumCard({ album, index }: AlbumCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => navigate(`/album/${album.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl mb-3 aspect-square shadow-lg">
        {album.coverUrl ? (
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${album.colors[0]}, ${album.colors[1]})`,
            }}
          >
            <span className="text-4xl font-display font-bold text-primary-foreground/60">
              {album.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Play overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-background/40 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-xl"
          >
            <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
          </motion.div>
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${album.colors[0]}66, transparent)`,
          }}
        />
      </div>

      <h3 className="font-display font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
        {album.title}
      </h3>
      <p className="text-xs text-muted-foreground truncate">{album.artist} · {album.year}</p>
    </motion.div>
  );
}
