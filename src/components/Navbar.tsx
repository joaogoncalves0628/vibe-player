import { motion } from "framer-motion";
import { Home, Heart, Library, Music2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export function Navbar() {
  const links = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/library", icon: Heart, label: "Curtidas" },
    { to: "/playlists", icon: Library, label: "Playlists" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass-strong"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Music2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg gradient-text">Vibes</span>
        </div>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
              activeClassName="text-foreground bg-secondary"
            >
              <link.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
