import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Studies", to: "/studies" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isQuietBlueStudy = pathname === "/studies/quiet-blue";
  const isRoomsOfLightExhibition = pathname === "/projects/digital-art-gallery/rooms-of-light";

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`page-shell${isQuietBlueStudy ? " page-shell--quiet-blue" : ""}`}>
        {!isRoomsOfLightExhibition && (
          <header className="site-header">
          <NavLink className="brand" to="/" aria-label="Clear Studio home">
            Clear Studio
          </NavLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <nav
            id="site-navigation"
            className="site-nav"
            aria-label="Primary navigation"
            data-open={menuOpen}
          >
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          </header>
        )}
        <main id="main">
          <Outlet />
        </main>
        <footer className="site-footer">
          <p className="footer-wordmark">Clear Studio</p>
          <div className="footer-address">
            <span>Madrid / Working everywhere</span>
            <span>Independent since 2026</span>
            <span>© Clear Studio</span>
          </div>
        </footer>
      </div>
    </>
  );
}
