import { useState, useEffect, useRef } from "react";

const Footer = () => {
  // ---------- Scroll reveal ----------
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ---------- Back to top ----------
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Smooth scroll for nav links ----------
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---------- Data ----------
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Project", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skill", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      icon: "fab fa-github",
      label: "GitHub",
      href: "#",
      hover: "hover:bg-gray-900",
    },
    {
      icon: "fab fa-linkedin-in",
      label: "LinkedIn",
      href: "#",
      hover: "hover:bg-blue-600",
    },
    {
      icon: "fab fa-twitter",
      label: "Twitter",
      href: "#",
      hover: "hover:bg-sky-500",
    },
    {
      icon: "fab fa-dribbble",
      label: "Dribbble",
      href: "#",
      hover: "hover:bg-pink-500",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`relative bg-gray-900 text-gray-300 overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 translate-y-1/2"></div>

      {/* Top gradient divider */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* ---------- Main footer grid ---------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group inline-flex items-center text-2xl font-bold text-white hover:text-indigo-400 transition-colors duration-200"
            >
              <span className="text-indigo-400 inline-block transition-transform duration-500 group-hover:rotate-180">
                ✦
              </span>
              <span className="ml-1.5">Van Choulay</span>
            </a>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-md">
              Full-Stack Developer & UI Designer crafting beautiful, responsive,
              and performant web applications. Always open to exciting new
              projects and collaborations.
            </p>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white ${social.hover} border border-gray-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <span className="w-0 h-0.5 bg-indigo-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">📧</span>
                <a
                  href="mailto:choulayvann@gmail.com"
                  className="hover:text-indigo-400 transition-colors"
                >
                  choulayvann@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">📱</span>
                <a
                  href="tel:+15551234567"
                  className="hover:text-indigo-400 transition-colors"
                >
                  +855 967-679-112
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">📍</span>
                <span>Kampong Speu, CAMBODIA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {currentYear}{" "}
            <span className="text-gray-300 font-medium">Van Choulay</span>. All
            rights reserved.
          </p>

          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            Built with <span className="text-red-500 animate-pulse">❤</span>{" "}
            using
            <span className="text-indigo-400 font-medium">React</span> &{" "}
            <span className="text-cyan-400 font-medium">Tailwind</span>
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors duration-200"
          >
            Back to top
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:-translate-y-1 transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
