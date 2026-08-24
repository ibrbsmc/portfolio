import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/nav-items"; // Navbar'daki bağlantıların etiketleri ve hedefleri
import GlassSurface from "../ui/glass-surface";
import NavLinks from "./nav-links"; // Menü bağlantılarını ekrana basan layout componenti.

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobil menünün açık veya kapalı olduğunu belirler.
  const [activeItem, setActiveItem] = useState(""); // Şu anda seçili olan navbar bağlantısını belirler.

  // Seçilen bağlantıyı işaretler ve mobil menüyü kapatır.
  const selectItem = (label) => {
    setActiveItem(label);
    setIsOpen(false);
  };

  return (
    <header className="absolute top-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 sm:top-6">
      <GlassSurface className={isOpen ? "h-64 md:h-16" : "h-16"}>
        <nav className="flex h-full flex-col px-5 md:flex-row md:items-center md:justify-between">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              onClick={() => setActiveItem("")}
              className="font-brand group text-lg font-semibold tracking-[-0.03em]"
            >
              <span className="text-zinc-100 transition group-hover:text-white">
                İbrahim
              </span>{" "}
              <span className="text-cyan-300 transition group-hover:text-cyan-200">
                Basmacı
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menüyü aç veya kapat"
              className="text-zinc-200 md:hidden"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <NavLinks
            items={navItems}
            isOpen={isOpen}
            activeItem={activeItem}
            onSelect={selectItem}
          />
        </nav>
      </GlassSurface>
    </header>
  );
}

export default Navbar;
