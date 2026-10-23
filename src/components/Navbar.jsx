import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ---------- Nav links (Home · Project · About · Skill · Contact) ----------
  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Project", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skill", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // ---------- Smooth scroll ----------
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  // ---------- Scroll-aware style ----------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---------- Scroll spy ----------
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ---------- Lock body scroll on mobile menu open ----------
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200/60"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* ---------- Logo ---------- */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group text-2xl font-bold tracking-tight text-gray-800 hover:text-indigo-600 transition-colors duration-200 flex items-center"
            >
              <span className="text-indigo-500 inline-block transition-transform duration-500 group-hover:rotate-180">
                ✦
              </span>
              <span className="ml-1.5">VanChoulay</span>
            </a>
          </div>

          {/* ---------- Desktop Navigation ---------- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative font-medium pb-1 transition-colors duration-200 group ${
                  activeSection === link.id
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ${
                    activeSection === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}

            {/* Resume CTA */}

            {/* Contact Me - Desktop */}
            <a
              href="https://t.me/VanCHOULAY"
              target="_blank"
              rel="noopener noreferrer"
              className="group ml-4 inline-flex shrink-0 items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
            >
              Contact Me
              <i className="fas fa-arrow-right ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
            </a>
          </div>

          {/* ---------- Mobile Menu Button ---------- */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Toggle menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Mobile Menu (slide-down) ---------- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-lg border-t border-gray-100">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
              style={{ transitionDelay: isOpen ? `${idx * 40}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            {/* Contact Me - Mobile */}
            <a
              href="https://t.me/VanCHOULAY"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-indigo-700 active:scale-95"
            >
              Contact Me
              <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
