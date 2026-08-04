import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page-shell">
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
        <main id="main">
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="footer-main">
            <p>Software, design and ideas for a clearer digital life.</p>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navigation.map((item) => (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
              <a href="mailto:hello@clearstudio.app">Contact</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Clear Studio</span>
            <span>Made with intention.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
