import { motion } from "framer-motion";
import { Home, Heart, Library, Music2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export function Sidebar() {
  const links = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/library", icon: Heart, label: "Curtidas" },
    { to: "/playlists", icon: Library, label: "Playlists" },
  ];

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 bottom-0 z-40 w-56 glass-strong flex flex-col py-6 px-3"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
          <Music2 className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-xl gradient-text">Vibes</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
            activeClassName="text-foreground bg-secondary/80 shadow-sm"
          >
            <link.icon className="w-[18px] h-[18px]" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom decoration */}
      <div className="mt-auto px-3">
        <div className="h-px w-full bg-border/50 mb-4" />
        <p className="text-[10px] text-muted-foreground/50 font-medium">© 2026 Vibes Player</p>
      </div>
    </motion.aside>
  );
}
