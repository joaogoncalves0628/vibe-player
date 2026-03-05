import { motion } from "framer-motion";
import { albums } from "@/data/music";
import { AlbumCard } from "@/components/AlbumCard";
import { usePlayer } from "@/contexts/PlayerContext";
import { Disc3, Sparkles } from "lucide-react";

const Index = () => {
  const { activeGradient } = usePlayer();

  return (
    <div
      className="min-h-screen pb-24 transition-all duration-700"
      style={{
        background: `linear-gradient(160deg, ${activeGradient[0]}18 0%, ${activeGradient[1]}0a 40%, hsl(240, 6%, 7%) 70%)`,
      }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-12 pb-8 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Disc3 className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground font-medium">Sua coleção de música</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-2">
            Descubra & <span className="gradient-text">Curta</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Explore seus álbuns favoritos e reproduza no YouTube Music
          </p>
        </motion.div>

        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow pointer-events-none"
          style={{ background: activeGradient[0] }}
        />
      </section>

      {/* Albums grid */}
      <section className="px-4 sm:px-6 max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-display font-semibold mb-6 text-foreground"
        >
          Álbuns
        </motion.h2>

        {albums[0].songs.length === 0 && albums.length === 1 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Disc3 className="w-16 h-16 text-primary mx-auto mb-4 opacity-60" />
            </motion.div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Nenhum álbum ainda
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Anexe suas músicas e álbuns para começar a construir sua biblioteca musical personalizada
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {albums.map((album, i) => (
              <AlbumCard key={album.id} album={album} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
