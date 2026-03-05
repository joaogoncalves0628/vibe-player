import { motion } from "framer-motion";
import { Library, ListMusic, Plus } from "lucide-react";
import { playlists } from "@/data/music";
import { usePlayer } from "@/contexts/PlayerContext";

const Playlists = () => {
  const { activeGradient } = usePlayer();

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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
              <Library className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Playlists</h1>
              <p className="text-muted-foreground">{playlists.length} playlist{playlists.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((pl, i) => (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <ListMusic className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {pl.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{pl.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
